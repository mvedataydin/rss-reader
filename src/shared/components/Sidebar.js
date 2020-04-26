import React from 'react';

import classes from './Sidebar.module.scss';
import Navigation from './Navigation';

//<img src={mainLogo} className={classes.Logo}/>   <BookOpen size={42} className={classes.Logo}/>

const Sidebar = (props) => {
  return (
    <aside className={classes.Sidebar}>
      <div className={classes.Brand}>
        <span className={classes.Logo}></span>
        <span className={classes.BrandName}>Flame</span> 
      </div>
      <nav>
        <Navigation onAddFeedClick={props.onAddFeedClick} onAllFeedsClick={props.onAllFeedsClick} onFavFeedsClick={props.onFavFeedsClick} dataList={props.dataList} onFeedClick={props.onFeedClick}/>
      </nav>
    </aside>
  )
};

export default Sidebar;

