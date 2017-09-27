import React from 'react';
import PropTypes from 'prop-types';
import Category from './category';

class Categories extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {CategoriesData, onCategoryClick} = this.props;

    return (
      <div className="filter">
        <div id="js-category" className="article-category">
          {CategoriesData.map((category, i) => <Category onCategoryClick={onCategoryClick} active={this.props.active === category.lookup_code
            ? true
            : false} key={i + 1} CategoryData={category}/>)}
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
