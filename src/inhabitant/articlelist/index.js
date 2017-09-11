import Categories from './categories';
import Articles from './articles';
import React from 'react';
import ReactDom from 'react-dom';
import '../../../static/css/reset.css';
import '../css/layout_inhabitant.css';
import '../css/article_list_inhabitant.css';



ReactDom.render(
  <div><Categories /><Articles /></div>,
  document.getElementById('root')
);
