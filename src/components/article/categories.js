import React from 'react';
import PropTypes from 'prop-types';
import Category from './category';

class Categories extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {CategoriesData} = this.props;
    return (
      <div className="filter">
        <div id="js-category" className="article-category">
          <div className="article-category-item active" data-flag="">全部</div>
          {CategoriesData.map((category, i) => <Category key={i} CategoryData={category} />)}
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  CategoriesData: PropTypes.array
};

Categories.defaultProps = {
  CategoriesData: []
};

export default Categories;
