import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.doClick = this.doClick.bind(this);
  }

  doClick(e){
    this.props.onCategoryClick(e.currentTarget.dataset.flag);
  }

  render() {
    const {lookup_code, lookup_value} = this.props;
    const active = this.props.active;
    const clazz = "article-category-item " + (active ? 'active' : '');
    return (
      <div onClick={this.doClick} className={clazz} href="javascript:void(0);" data-flag={lookup_code}>{lookup_value}</div>
    );
  }
}

Category.propTypes = {
  lookup_code: PropTypes.string,
  lookup_value: PropTypes.string,
  onCategoryClick: PropTypes.func
};

Category.defaultProps = {
  active: '',
  lookup_code: '',
  lookup_value: '',
  onCategoryTouch: function(){}
};

export default Category;
