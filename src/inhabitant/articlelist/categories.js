import React from 'react';
import Category from './category';

class Categories extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="filter">
        <div id="js-category" className="article-category">
          <div className="article-category-item active" data-flag="">全部</div>
          <Category/>
          <Category/>
          <Category/>
        </div>
      </div>
    );
  }
}

export default Categories;
