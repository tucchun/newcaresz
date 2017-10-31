import React from 'react';
import PropTypes from 'prop-types';
import Article from './article';
import '../../../static/css/reset.css';
import './layout_inhabitant.css';
import './article_list_inhabitant.css';

class Articles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {ArticlesData, onArticleClick} = this.props;
    return (
      <div className="article_list">
        <ul id="js-article-list" className="">
          {ArticlesData.map((article, i) => <Article onArticleClick={onArticleClick} key={i} {...article}/>)}
        </ul>
        <div className="tip hide" id="js-loading-tip">加载中。。。</div>
      </div>
    );
  }
}

Articles.propTypes = {
  onArticleClick: PropTypes.func,
  onCategoryClick: PropTypes.func,
  ArticlesData: PropTypes.array,
  CategoriesData: PropTypes.array,
  active: PropTypes.string
};

Articles.defaultProps = {
  onArticleClick: function() {},
  onCategoryClick: function() {},
  ArticlesData: [],
  CategoriesData: [],
  active: ''
};

export default Articles;
