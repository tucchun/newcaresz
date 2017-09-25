import React from 'react';
import PropTypes from 'prop-types';
import Categories from './categories';
import Article from './article';
import '../../../static/css/reset.css';
import './layout_inhabitant.css';
import './article_list_inhabitant.css';

class Articles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {ArticlesData, CategoriesData} = this.props;
    return (
      <div>
        <Categories CategoriesData={CategoriesData} test={111}/>
        <div className="article_list">
          <ul id="js-article-list" className="">
            {ArticlesData.map((article, i) => <Article key={i} ArticleData={article} test={i}/>)}
          </ul>
          <div className="tip hide" id="js-loading-tip">加载中。。。</div>
        </div>
      </div>
    );
  }
}

Articles.propTypes = {
  ArticlesData: PropTypes.array,
  CategoriesData: PropTypes.array
};

Articles.defaultProps = {
  ArticlesData: [],
  CategoriesData: []
};

export default Articles;
