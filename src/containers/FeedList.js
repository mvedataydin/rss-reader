import React from 'react';
import classes from './FeedList.module.scss';
import {Globe, RefreshCw} from 'react-feather';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {formatDate} from '../shared/reusable/parse-dom-document';
const FeedList = (props) => {

  const feedItemClickHandler = (clickedFeedData) => {
    props.onFeedItemClick(clickedFeedData);
  }
  return (
  <section className={classes.FeedList}>
    <section className={classes.FeedListToolbar}>
      <div className={classes.ToolbarSync}>
        <RefreshCw size={18}  className={classes.ToolbarSyncIcon}/> 
        <span className={classes.ToolbarSyncText}>Sync</span>
      </div>
    </section>

    <SimpleBar style={{maxHeight: 'calc(100vh - 40px)' }} className={classes.FeedListContainer}>
      {props.feedData.items ? props.feedData.items.map((feed, index) => 
      (
        <div key={index}>
        <div className={classes.FeedItem} onClick={() => feedItemClickHandler(feed)}>
          <img className={classes.ItemIcon} src = {props.feedData.favicon} alt='favicon' />
          <span className={classes.Source}>{props.feedData.title.length >= 26 ? props.feedData.title.substring(0.19) + '...' : props.feedData.title}</span>
          <span className={classes.Date}>{feed.pubDate ? formatDate(feed.pubDate): null}</span>
          <div className={classes.Title}>{feed.title}</div>
          <div className={classes.Author}>by: {feed.author ? feed.author : 'Author not found'}</div>
        </div>
        <hr/>
        </div>
      )):null}
    </SimpleBar>

  </section>
  )
};

export default FeedList;