import React from 'react';

class Article extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    var data = this.props.data;
    return (
      <li className="box js-article_item js-{data.article_category}" data-url="./article_detail.html">
        <div className="flex article-list-category">
          <p className="title">{"asdfasdfa"}</p>
          <div className="author"><span className="article_author">{"asdfasdfa"}</span><span>{"asdfasdfa"}</span></div>
        </div>
        <div className="article-img"><img data-src="{{= value.article_img_url }}" className="lazyload" alt="新康医疗" /></div>
      </li>
    );
  }
}



export default Article;
