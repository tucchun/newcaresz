import Articles from '../../components/article/articles';
import React from 'react';
import ReactDom from 'react-dom';
import Util from '../../../assets/js/Util';
import $ from 'jquery';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.state = {
      articleData: [],
      categoriesData: [],
      active: ''
    };
    this.cache = {};
    console.log("constructor");
  }

  handleCategoryClick(flag) {
    this.setState({active: flag});
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
      this.setState({articleData: ArticleData, categoriesData: CategoriesData});
    }).catch(function(err) {
      Util.alert(err);
    });
    console.log("componentDidMount");
  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
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
