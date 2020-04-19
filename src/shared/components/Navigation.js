import React from 'react';

import classes from './Navigation.module.scss';
import { List, Settings, Grid,Info, Star,Plus,Rss } from 'react-feather';

const Navigation = (props) => {
  const handleFeedClicked = (source) => {
    props.onFeedClick(source);
  }
  return (
    <ul>
      <li >
        <div className={`${classes.NavigationItem} ${classes.AddItem}`}  onClick={props.onAddFeedClick}>
          <Plus size={18} />
          <span className={classes.AddItemText} >Add Feed</span>
        </div>
      </li>
      <li>
        <div className={classes.NavigationItem}>
          <List size={18} className={classes.ItemIcon} />
          <span className={classes.ItemText}>All Feeds</span>
        </div>
      </li>
      <li>
        <div className={classes.NavigationItem}>
          <Star size={18} className={classes.ItemIcon} />
          <span className={classes.ItemText}>Favourites</span>
        </div>
      </li>
      <li>
        <div className={classes.NavigationItem}>
          <Settings size={18} className={classes.ItemIcon} />
          <span className={classes.ItemText}>Settings</span>
        </div>
      </li>
      <li>
        <div className={classes.NavigationItem}>
          <Grid size={18} className={classes.ItemIcon} />
          <span className={classes.ItemText}>Compact Mode</span>
        </div>
      </li>
      <li>
        <div className={classes.NavigationItem}>
          <Info size={18} className={classes.ItemIcon} />
          <span className={classes.ItemText}>About</span>
        </div>
      </li>
      <span className={`${classes.NavigationItem} ${classes.Subscriptions}`}>SUBSCRIPTIONS</span>
      {props.dataList.map((item,index)=> {
        return(
          <li key={index}>
            <div className={`${classes.NavigationItem} ${classes.FeedItem}`} onClick={() => handleFeedClicked(item)}>
              {item.favicon !== undefined ? <img className={classes.ItemIcon} src = {item.favicon} alt='favicon' /> : null }
              <span className={classes.ItemText}>{item.title}</span>
            </div>
          </li>
        );
      })}
    </ul>
  )
};

export default Navigation;