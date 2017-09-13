import React from 'react';

class Article extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var props = this.props;
    const source = window.screen.width > 750
      ? 'hecadre'
      : 'article_list';
    const url = "./article_detail.html?article_id=" + props.article_id + "&source=" + source;

    return (
      <li className={"box js-article_item js-" + props.article_category} data-url={url}>
        <div className="flex article-list-category">
          <p className="title">{props.article_title}</p>
          <div className="author">
            <span className="article_author">{props.article_author}</span>
            <span>{props.create_dateStr}</span>
          </div>
        </div>
        <div className="article-img"><img data-src={props.article_img_url} className="lazyload" alt="新康医疗"/></div>
      </li>
    );
  }
}

export default Article;
