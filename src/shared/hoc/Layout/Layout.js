import React from 'react';
import Sidebar from '../../components/Sidebar';
import classes from './Layout.module.scss';

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <Sidebar dataList={props.dataList} onFeedClick={props.onFeedClick} onAddFeedClick={props.onAddFeedClick} onAllFeedsClick={props.onAllFeedsClick}/>
      {props.children}
    </div>
  )
};

export default Layout;
