import React from 'react';
import PropTypes from 'prop-types';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.doClick = this.doClick.bind(this);
  }
  render() {
    const {article_id, article_category, article_title, article_author, create_dateStr, article_img_url} = this.props;
    const source = window.screen.width > 750
      ? 'hecadre'
      : 'article_list';
    const url = "./article_detail.html?article_id=" + article_id + "&source=" + source;

    return (
      <li onClick={this.doClick} className={"box js-article-item js-" + article_category} data-url={url}>
        <div className="flex article-list-category">
          <p className="title">{article_title}</p>
          <div className="author">
            <span className="article_author">{article_author}</span>
            <span>{create_dateStr}</span>
          </div>
        </div>
        <div className="article-img"><img data-src={article_img_url} className="lazyload" alt="新康医疗"/></div>
      </li>
    );
  }

  doClick(e){
    let url = e.currentTarget.dataset.url;
    // location.href = url;
    this.props.onArticleClick(url);
  }
}

Article.propTypes = {
  article_id: PropTypes.number,
  article_category: PropTypes.string,
  article_title: PropTypes.string,
  article_author: PropTypes.string,
  create_dateStr: PropTypes.string,
  article_img_url: PropTypes.string,
  onArticleClick: PropTypes.func
};

Article.defaultProps = {
  article_id: '',
  article_category: '',
  article_title: '',
  article_author: '',
  create_dateStr: '',
  article_img_url: '',
  onArticleClick: function(){}
};

export default Article;
