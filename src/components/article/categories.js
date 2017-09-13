import React from 'react';
import Category from './category';

class Categories extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = [
      {
        "lookup_code": '123123',
        "lookup_value": '菜单一'
      }, {
        "lookup_code": '123123',
        "lookup_value": '菜单二'
      }
    ];
    return (
      <div className="filter">
        <div id="js-category" className="article-category">
          <div className="article-category-item active" data-flag="">全部</div>
          {data.map((category) => <Category {...category}/>)}
        </div>
      </div>
    );
  }
}

export default Categories;
