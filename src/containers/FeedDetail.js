import React from 'react';
import classes from './FeedDetail.module.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


const FeedDetail = (props) => {
  return (
  <section className={classes.FeedDetail}>
  <section className={classes.FeedDetailToolbar}>
    {props.feedItemData.sourceTitle ?
      <div className={classes.SourceContainer}>
        <img className={classes.ItemIcon} src = {props.feedItemData.favicon} alt='favicon' />
        <span className={classes.Source}>{props.feedItemData.sourceTitle}</span>
      </div>
     : null}

  </section> 
  {Object.keys(props.feedItemData).length !== 0 ? (
  <SimpleBar style={{maxHeight: 'calc(100vh - 40px)' }} className={classes.FeedDetailContainer}>
    <div className={classes.FeedTitle}>{props.feedItemData.title}</div>
    <div className={classes.FeedDateAuthor}>{props.feedItemData.author ? props.feedItemData.isoDate.split('T')[0] + ', by ' + props.feedItemData.author : props.feedItemData.date }</div>
    <div className={classes.FeedContent} dangerouslySetInnerHTML={{__html: props.feedItemData.content ? props.feedItemData.content : null}} >
    </div>
  </SimpleBar>
  ) : null}
  </section>
  )
};

export default FeedDetail;