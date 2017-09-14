import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {CategoryData} = this.props;
    return (
      <div className="article-category-item" href="javascript:void(0);" data-flag={CategoryData.lookup_code}>{CategoryData.lookup_value}</div>
    );
  }
}

Category.propTypes = {
  CategoryData: PropTypes.object
};

Category.defaultProps = {
  CategoryData: {}
};

export default Category;
