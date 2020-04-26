import React from 'react';
import classes from './FeedDetail.module.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {Star, Globe} from 'react-feather';
import {formatDate} from '../shared/reusable/parse-dom-document';


const FeedDetail = (props) => {

  let color = 'none';
  if(props.feedItemData.favourite){
    color = 'black';
  }
  return (
  <section className={classes.FeedDetail}>
  <section className={classes.FeedDetailToolbar}>
    
    {props.feedItemData.sourceTitle ?
      <div className={classes.SourceContainer}>
        <img className={classes.ItemIcon} src = {props.feedItemData.favicon} alt='favicon' />
        <span className={classes.Source}>{props.feedItemData.sourceTitle.length >= 26 ? props.feedItemData.sourceTitle.substring(0,19): props.feedItemData.sourceTitle}</span>
        <Globe size={18} className={classes.GlobeButton} onClick={null}/>
        <Star size={18} fill={color} className={classes.FavButton} onClick={props.onFavButtonClick}/>
      </div>
     : null}
  </section> 
  {Object.keys(props.feedItemData).length !== 0 ? (
  <SimpleBar style={{maxHeight: 'calc(100vh - 40px)' }} className={classes.FeedDetailContainer}>
    <div className={classes.FeedTitle}>{props.feedItemData.title}</div>
    <div className={classes.FeedDateAuthor}>{props.feedItemData.author ? formatDate(props.feedItemData.pubDate) + ', by ' + props.feedItemData.author : formatDate(props.feedItemData.pubDate) }</div>
    <div className={classes.FeedContent} dangerouslySetInnerHTML={{__html: props.feedItemData.content ? props.feedItemData.content : null}} >
    </div>
  </SimpleBar>
  ) : null}
  </section>
  )
};

export default FeedDetail;