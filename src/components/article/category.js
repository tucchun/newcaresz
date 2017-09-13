import React from 'react';

class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="article-category-item" href="javascript:void(0);" data-flag={this.props.lookup_code}>{this.props.lookup_value}</div>
    );
  }
}

export default Category;
