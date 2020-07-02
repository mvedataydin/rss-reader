import React, {useState} from 'react';
import axios from 'axios';
import classes from './FeedList.module.scss';
import { RefreshCw, Search} from 'react-feather';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {formatDate} from '../shared/reusable/parse-dom-document';


const FeedList = (props) => {
  const [enteredText, setEnteredText] = useState('');
  const feedItemClickHandler = (clickedFeedData) => {
    props.onFeedItemClick(clickedFeedData);
  }
  const handleSearchChanged = (e) => {
    let enteredVal = e.target.value;
    setEnteredText(enteredVal);
    axios.get("http://127.0.0.1:3001/search?q=" + e.target.value)
    .then(response => {
        console.log(response);
    })
  }
  return (
  <section className={classes.FeedList}>
    <section className={classes.FeedListToolbar}>
      <div className={classes.ToolbarSearch}>
        <Search size={18}  className={classes.ToolbarSearchIcon}/> 
        <input className={classes.ToolbarSearchInput} value={enteredText} 
        placeholder='Search' onChange={ event => {
          handleSearchChanged(event);
        }}
        />
      </div>
      <div className={classes.ToolbarSync}>
        <RefreshCw size={18}  className={classes.ToolbarSyncIcon}/> 
        <span className={classes.ToolbarSyncText}>Sync</span>
      </div>
    </section>

    <SimpleBar style={{maxHeight: 'calc(100vh - 40px)' }} className={classes.FeedListContainer}>
      {props.feedData.items ? props.feedData.items.map((feed, index) =>{
        return feed.title.toLowerCase().includes(enteredText.toLowerCase()) ? 
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
      ):null
      }):null}
      {props.showAll ? props.feedData.map((data,index) => {
        return(
          <div key={index}>
            {
              data.items.map((feed, index) => {
                return feed.title.toLowerCase().includes(enteredText.toLowerCase()) ? 
                (
                <div key={index}>
                  <div className={classes.FeedItem} onClick={() => feedItemClickHandler(feed)}>
                    <img className={classes.ItemIcon} src = {data.favicon} alt='favicon' />
                    <span className={classes.Source}>{data.title.length >= 26 ? data.title.substring(0.19) + '...' : data.title}</span>
                    <span className={classes.Date}>{feed.pubDate ? formatDate(feed.pubDate): null}</span>
                    <div className={classes.Title}>{feed.title}</div>
                    <div className={classes.Author}>by: {feed.author ? feed.author : 'Author not found'}</div>
                  </div>
                <hr/>
                </div>
              ): null
              })
            }
          </div>
        )
      }):null}
      {props.showFav ? props.feedData.map((data,index) => {
        return(
          <div key={index}>
            {
              data.items.map((feed, index) => 
              (
                <div key={index}>
                {feed.favourite && feed.title.toLowerCase().includes(enteredText.toLowerCase()) ? 
                  <div key={index}>
                    <div className={classes.FeedItem} onClick={() => feedItemClickHandler(feed)}>
                      <img className={classes.ItemIcon} src = {data.favicon} alt='favicon' />
                      <span className={classes.Source}>{data.title.length >= 26 ? data.title.substring(0.19) + '...' : data.title}</span>
                      <span className={classes.Date}>{feed.pubDate ? formatDate(feed.pubDate): null}</span>
                      <div className={classes.Title}>{feed.title}</div>
                      <div className={classes.Author}>by: {feed.author ? feed.author : 'Author not found'}</div>
                    </div>
                  <hr/>
                  </div>
                : null}            
                </div>
              ))
            }
          </div>
        )
      }):null}
    </SimpleBar>

  </section>
  )
};

export default FeedList;