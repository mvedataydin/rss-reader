import React from 'react';
import Sidebar from '../../components/Sidebar';
import classes from './Layout.module.scss';

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <Sidebar />
      {props.children}
    </div>
  )
};

export default Layout;
