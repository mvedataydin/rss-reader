import React from 'react';
import classes from './FeedList.module.scss';
import {Globe, RefreshCw} from 'react-feather';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

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
        <>
        <div key={index} className={classes.FeedItem} onClick={() => feedItemClickHandler({...feed, sourceTitle: props.feedData.title, favicon: props.feedData.favicon})}>
          <img className={classes.ItemIcon} src = {props.feedData.favicon} alt='favicon' />
          <span className={classes.Source}>{props.feedData.title}</span>
          <span className={classes.Date}>{feed.isoDate.split('T')[0]}</span>
          <div className={classes.Title}>{feed.title}</div>
          <div className={classes.Author}>by: {feed.author ? feed.author : 'Author not found'}</div>
        </div>
        <hr/>
        </>
      )):null}
    </SimpleBar>

  </section>
  )
};

export default FeedList;