import Articles from '../../components/article/articles';
import React from 'react';
import ReactDom from 'react-dom';
import Util from '../../../assets/js/Util';


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.state = {
      articleData: [],
      categoriesData: [],
      active: ''
    };
    console.log("constructor");
  }

  handleCategoryClick(flag){
    this.setState({
      active: flag
    });
  }

  render() {
    console.log("render");
    return (<Articles active={this.state.active} onCategoryClick={this.handleCategoryClick} ArticlesData={this.state.articleData} CategoriesData={this.state.categoriesData}/>);
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    this.fetchArticleData().then(data => {
      this.setState({articleData: data});
    }).catch(function(err) {
      Util.alert(err);
    });

    this.fetchCategoriesData().then(data => {
      data.splice(0, 0, {
        lookup_code: '',
        lookup_value: '全部'
      });
      this.setState({categoriesData: data});
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
