import React from 'react';

class Article extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let source = window.screen.width > 750 ? 'hecadre' : 'article_list';
    return (
      <li className="box js-article_item js-{this.props..article_category}" data-url="./article_detail.html">
        <div className="flex article-list-category?article_id={this.props.article_id}&source={source}">
          <p className="title">{"asdfasdfa"}</p>
          <div className="author"><span className="article_author">{"asdfasdfa"}</span><span>{}</span></div>
        </div>
        <div className="article-img"><img data-src="{{= value.article_img_url }}" className="lazyload" alt="新康医疗" /></div>
      </li>
    );
  }
}



export default Article;
