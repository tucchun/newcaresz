import Articles from '../../components/article/articles';
import React from 'react';
import ReactDom from 'react-dom';
import Util from '../../../assets/js/Util';
import $ from 'jquery';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScroll.state = 0;
    this.state = {
      articleData: [],
      categoriesData: [],
      active: undefined
    };
    this.cache = {};
    console.log("constructor");
  }

  handleCategoryClick(flag) {
    this.fetchArticleData().then((articleList) => {
      this.setState({articleData: articleList, active: flag});
    });
  }

  handleScroll() {
    //  滚动事件
    if (this.handleScroll.state === 1)
      return false;

    var viewH = $(window).height(),
      contentH = $("html").height(),
      scrollTop = $(window).scrollTop();
    if (viewH + scrollTop >= contentH) {

      this.handleScroll.state = 1;

      this.fetchArticleData().then(articleList => {
        this.handleScroll.state = 0;

        this.setState({
          articleData: articleList.cocat(this.state.articleData)
        });
      }).catch(() => {
        this.handleScroll.state = 0;
      });
    }
    return undefined;
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  render() {
    console.log("render");
    return (<Articles active={this.state.active} onCategoryClick={this.handleCategoryClick} ArticlesData={this.state.articleData} CategoriesData={this.state.categoriesData}/>);
  }

  componentDidMount() {
    Promise.all([this.fetchArticleData(), this.fetchCategoriesData()]).then(([ArticleData, CategoriesData]) => {
      CategoriesData.splice(0, 0, {
        lookup_code: '',
        lookup_value: '全部'
      });
      this.cache[this.state.active] = {
        params: {
          "begin": 0,
          "count": 10,
          "article_category": this.state.active
        },
        data: {
          "articleList": ArticleData
        },
        scrollTop: 0
      };
      this.setState({articleData: ArticleData, categoriesData: CategoriesData, active: ''});
    }).catch(function(err) {
      Util.alert(err);
    });


    window.onscroll = this.handleScroll;


    console.log("componentDidMount");

  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    if (this.state.active !== nextState.active)
      return true;

    return false;
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
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
