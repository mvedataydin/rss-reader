import React from 'react';

import classes from './Sidebar.module.scss';
import Navigation from './Navigation';

//<img src={mainLogo} className={classes.Logo}/>   <BookOpen size={42} className={classes.Logo}/>

const Sidebar = (props) => {
  return (
    <aside className={classes.Sidebar}>
      <div className={classes.Brand}>
        <span>VedoReader</span> 
      </div>
      <nav>
        <Navigation/>
        <hr/>
      </nav>
    </aside>
  )
};

export default Sidebar;

