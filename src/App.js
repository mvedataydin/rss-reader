import React from 'react';
import logo from './logo.svg';
import Layout from './shared/hoc/Layout/Layout';
import FeedList from './containers/FeedDetail';
import FeedDetail from './containers/FeedList';

import './App.scss';

function App() {
  return (
    <>
      <Layout>
        <FeedList />
        <FeedDetail />
      </Layout>
    </>
  );
}

export default App;
