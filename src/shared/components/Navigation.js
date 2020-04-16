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
        <div className={`${classes.NavigationItem} ${classes.AddItem}`}>
          <Plus size={18} />
          <span className={classes.AddItemText}>Add Feed</span>
        </div>
      </li>
      <li>
        <div className={classes.NavigationItem}>
          <List size={18} className={classes.ItemIcon} />
          <span className={classes.ItemText}>My Feeds</span>
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
          <Grid fill="black" size={18} className={classes.ItemIcon} />
          <span className={classes.ItemText}>Compact Mode</span>
        </div>
      </li>
      <li>
        <div className={classes.NavigationItem}>
          <Info size={18} className={classes.ItemIcon} />
          <span className={classes.ItemText}>About</span>
        </div>
      </li>
      <hr/>
      {props.sources.map((source,index)=> {
        return(
          <li key={index}>
            <div className={classes.NavigationItem} onClick={() => handleFeedClicked(source.url)}>
              <Rss strokeWidth = "3" size={18} className={classes.ItemIcon} />
              <span className={classes.ItemText}>{source.title}</span>
            </div>
          </li>
        );
      })}
    </ul>
  )
};

export default Navigation;