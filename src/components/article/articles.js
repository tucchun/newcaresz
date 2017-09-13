import React from 'react';
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
    const articleData = [
      {
        article_id: '12123',
        article_category: 'sdfasdf',
        article_title: 'asdf',
        article_author: 'dfgdf',
        create_dateStr: 'efdf',
        article_img_url: 'sdfse'
      }, {
        article_id: '123',
        article_category: 'sdf',
        article_title: 'fdss',
        article_author: 'essd',
        create_dateStr: 'fsd',
        article_img_url: 'hrr'
      }, {
        article_id: '421',
        article_category: '12sds',
        article_title: 'hdfg',
        article_author: 'ertd',
        create_dateStr: 'fghf',
        article_img_url: 'wrwer'
      }
    ];
    return (
      <div>
        <Categories/>
        <div className="article_list">
          <ul id="js-article-list" className="">
            {articleData.map((article) => <Article {...article}/>)}
          </ul>
          <div className="tip hide" id="js-loading-tip">加载中。。。</div>
        </div>
      </div>
    );
  }
}

export default Articles;
