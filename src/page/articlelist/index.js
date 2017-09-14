import Articles from '../../components/article/articles';
import React from 'react';
import ReactDom from 'react-dom';
import Util from '../../../assets/js/Util';




const articleData = [
  {
    article_id: '12123',
    article_category: 'sdfasdf',
    article_title: 'asdf',
    article_author: 'dfgdf',
    create_dateStr: 'efdf',
    article_img_url: 'sdfse'
  }, {
    article_id: '123',
    article_category: 'sdf',
    article_title: 'fdss',
    article_author: 'essd',
    create_dateStr: 'fsd',
    article_img_url: 'hrr'
  }, {
    article_id: '421',
    article_category: '12sds',
    article_title: 'hdfg',
    article_author: 'ertd',
    create_dateStr: 'fghf',
    article_img_url: 'wrwer'
  }
];

const categoriesData = [
  {"lookup_code": '123123', "lookup_value": "菜单一"},
  {"lookup_code": '1212', "lookup_value": "菜单二"}
];

fetch("../../assets/rss/getarticlelist.json").then(response => {
  var data = response.json();
  console.log(data);
  return data;
}, function(){
  console.log(...arguments);
});




ReactDom.render(<div><Articles ArticlesData={articleData} CategoriesData={categoriesData}/></div>, document.getElementById('root'));
