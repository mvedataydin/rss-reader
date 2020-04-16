import React, {useState} from 'react';
import Layout from './shared/hoc/Layout/Layout';
import FeedList from './containers/FeedList';
import FeedDetail from './containers/FeedDetail';
import AddSourceForm from './shared/components/AddSourceForm';
import parseDomDocument from './shared/reusable/parse-dom-document';
import './App.scss';

function App() {
  
  const [sourceList, setSourceList] = useState([]);
  const [selectedFeedData, setSelectedFeedData] = useState([]);

  const addSourceHandler = (title, url) => {
    setSourceList([
      ...sourceList,
      {
        title: title,
        url: url
      }
    ])
  }
  const feedClickHandler = (url) => {
    const RSS_URL = `https://cors-anywhere.herokuapp.com/${url}`;
    fetch(RSS_URL)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then(data => {
        const feeds = parseDomDocument(data);
        setSelectedFeedData(feeds);
      })
      .catch(() => {
        fetch(url,{mode:'cors'})
          .then(response => response.text())
          .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
          .then(data => {
            const feeds = parseDomDocument(data);
            setSelectedFeedData(feeds);
        })
        .catch(e=> {
          console.log(e)
        })
      })
  }
  return (
    <>
      <Layout sources={sourceList} onFeedClick={feedClickHandler}>
        <FeedList feedData={selectedFeedData} />
        <FeedDetail />
      </Layout>
      <AddSourceForm onAddSource={addSourceHandler}/>
    </>
  );
}

export default App;
