import React from 'react';
import Article from './article';

class Articles extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="article_list">
        <ul id="js-article-list" className="">
          <Article />
          <Article />
          <Article />
        </ul>
        <div className="tip hide" id="js-loading-tip">加载中。。。</div>
      </div>
    );
  }
}

export default Articles;
