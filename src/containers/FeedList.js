import React from 'react';
import classes from './FeedList.module.scss';

const FeedList = (props) => {
  return (
  <section className={classes.FeedList}>
    <section className={classes.FeedListToolbar}></section>
    <section className={classes.FeedListContainer}>
      {props.feedData ? props.feedData.map((feed, index) => 
      (
        <div key={index} className={classes.FeedItem}>
          <div>{feed.source}</div>
          <div>{feed.date}</div>
          <div>{feed.title}</div>
          <div>by: {feed.author}</div>
          <hr/>
        </div>
      )):null}
    </section>
    
  </section>
  )
};

export default FeedList;