import Categories from '../../components/article/categories';
import Articles from '../../components/article/articles';
import React from 'react';
import ReactDom from 'react-dom';
import Util from '../../../assets/js/Util';
import $ from 'jquery';

class Index extends React.Component {
  constructor(props) {
    super(props);
    let hashArr = location.hash.substr(1).split("/");
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScroll.state = 0;
    this.state = {
      articleData: [],
      categoriesData: [],
      active: hashArr[0] || ''
    };
    this.cache = {};

    // 设置默认标签的参数
    this.cache[this.state.active] = {
      params: {
        "begin": 0,
        "count": 10,
        "user_id": parseInt(Util.userId),
        "article_category": this.state.active
      },
      data: {
        "articleList": []
      },
      scrollTop: 0,
      position: hashArr[1] || 0
    };
    console.log("constructor");
  }

  handleArticleClick(articleid) {
    const source = window.screen.width > 750
      ? 'hecadre'
      : 'article_list';
    const url = Util.host + "../src/inhabitant/article_detail.html?article_id=" + articleid + "&source=" + source;
    console.log(url);
    location.href = url;
  }

  handleCategoryClick(flag) {
    if (flag !== this.state.active) {
      // 记录当前标签内容的位子
      this.cache[this.state.active].scrollTop = $(window).scrollTop();
      let left = this.$categories.scrollLeft();
      location.hash = flag + "/" + left;
      $(window).scrollTop(0);
      if (this.cache[flag]) {
        this.setState({articleData: this.cache[flag].data.articleList, active: flag});
      } else {
        this.cache[flag] = {
          params: {
            "begin": 0,
            "count": 10,
            "user_id": parseInt(Util.userId),
            "article_category": flag
          },
          data: {
            "articleList": []
          },
          scrollTop: 0,
          position: left
        };
        Util.load("加载数据...");
        this.fetchArticleData(this.cache[flag].params).then((articleList) => {
          console.log(articleList)
          this.cache[flag].data.articleList = articleList;
          this.setState({articleData: articleList, active: flag});
          Util.hideLoad();
        }).catch(err => {
          Util.hideLoad();
          this.setState({articleData: [], active: flag});
          console.log(err);
          Util.alert("当前网络不可用，请检查你的网络设置！")
        });
      }

    }

  }

  handleScroll() {
    //  滚动事件
    if (this.handleScroll.state === 0) {

      let viewH = $(window).height(),
        contentH = $("html").height(),
        scrollTop = $(window).scrollTop(),
        currentActive = this.cache[this.state.active];
      if (viewH + scrollTop >= contentH) {

        this.handleScroll.state = 1;
        currentActive.params.begin += 1;
        this.$loading_tip.show();
        this.fetchArticleData(currentActive.params).then(articleList => {
          let data = articleList.concat(this.state.articleData);
          this.handleScroll.state = 0;
          currentActive.scrollTop = $(window).scrollTop();
          currentActive.data.articleList = data;
          this.setState({articleData: data});
          this.$loading_tip.hide();
        }).catch(err => {
          console.log(err);
          this.handleScroll.state = 0;
          currentActive.params.begin -= 1;
          this.$loading_tip.hide();
        });
      }
    }
  }

  doAutoSize() {
    if (window.screen.width > 750) {
      this.$articleList.addClass("article-list-inner");
    } else {
      this.$articleList.removeClass("article-list-inner");
    }
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  render() {
    console.log("render");
    return (
      <div ref="articles">
        <div>
          <Categories onCategoryClick={this.handleCategoryClick} active={this.state.active} CategoriesData={this.state.categoriesData}/>
        </div>
        <div>
          <Articles ref="articles" ArticlesData={this.state.articleData} onArticleClick={this.handleArticleClick}/>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // 初始化
    Promise.all([
      this.fetchArticleData(this.cache[this.state.active].params),
      this.fetchCategoriesData()
    ]).then(([ArticleData, CategoriesData]) => {
      CategoriesData.splice(0, 0, {
        lookup_code: this.state.active,
        lookup_value: '全部'
      });
      this.cache[this.state.active].data.articleList = ArticleData;
      this.setState({articleData: ArticleData, categoriesData: CategoriesData});
    }).catch(function(err) {
      Util.alert(err);
    });
    let $articles = $(this.refs.articles);
    let tid = {};
    window.onscroll = this.handleScroll;
    this.$categories = $articles.find("#js-category");
    this.$loading_tip = $articles.find("#js-loading-tip");
    location.hash = this.state.active + "/" + this.cache[this.state.active].position;
    this.$articleList = $articles.find("#js-article-list");
    this.doAutoSize();
    window.addEventListener('resize', () => {
      clearTimeout(tid);
      tid = setTimeout(this.doAutoSize, 300);
    }, false);
    // 浏览器缓存中读取时也需要重新设置rem基准值
    window.addEventListener('pageshow', e => {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(this.doAutoSize, 300);
      }
    }, false);
    console.log("componentDidMount");

  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
    // 设置标签位子
    this.$categories.scrollLeft(this.cache[this.state.active].position);
    $(window).scrollTop(this.cache[this.state.active].scrollTop);
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  fetchArticleData() {
    return fetch("../../assets/rss/getarticlelist.json").then(response => {
      return response.json();
    }).then(data => {
      if (data.ret_code === 1) {
        return data.ret_data.articleList;
      } else {
        throw new Error(data.ret_msg || "查询信息错误！");
      }
    });
  }

  fetchCategoriesData() {
    return fetch("../../assets/rss/getarticlecategory.json").then(response => {
      return response.json();
    }).then(data => {
      if (data.ret_code === 1) {
        return data.ret_data;
      } else {
        throw new Error(data.ret_msg || "查询信息错误！");
      }
    });
  }

}

ReactDom.render(
  <Index/>, document.getElementById('root'));
