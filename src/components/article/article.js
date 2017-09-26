import React from 'react';
import PropTypes from 'prop-types';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.doTouch = this.doTouch.bind(this);
  }
  render() {
    const {ArticleData} = this.props;
    var props = this.props;
    const source = window.screen.width > 750
      ? 'hecadre'
      : 'article_list';
    const url = "./article_detail.html?article_id=" + ArticleData.article_id + "&source=" + source;

    return (
      <li onClick={this.doTouch} className={"box js-article-item js-" + props.article_category} data-url={url}>
        <div className="flex article-list-category">
          <p className="title">{ArticleData.article_title}</p>
          <div className="author">
            <span className="article_author">{ArticleData.article_author}</span>
            <span>{ArticleData.create_dateStr}</span>
          </div>
        </div>
        <div className="article-img"><img data-src={ArticleData.article_img_url} className="lazyload" alt="新康医疗"/></div>
      </li>
    );
  }

  doTouch(e){
    //let url = e.currentTarget.dataset.url;
    //location.href = url;
  }
}

Article.propTypes = {
  ArticleData: PropTypes.object
};

Article.defaultProps = {
  ArticleData: {}
};

export default Article;
