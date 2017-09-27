import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.doTouch = this.doTouch.bind(this);
  }

  doTouch(e){
    this.props.onCategoryTouch(e.currentTarget.dataset.flag);
  }

  render() {
    const {CategoryData} = this.props;
    const active = this.props.active;
    const clazz = "article-category-item " + (active ? 'active' : '');
    return (
      <div onClick={this.doTouch} className={clazz} href="javascript:void(0);" data-flag={CategoryData.lookup_code}>{CategoryData.lookup_value}</div>
    );
  }
}

Category.propTypes = {
  CategoryData: PropTypes.object,
  onCategoryTouch: PropTypes.func
};

Category.defaultProps = {
  CategoryData: {},
  onCategoryTouch: function(){}
};

export default Category;
