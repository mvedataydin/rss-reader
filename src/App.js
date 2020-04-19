import React, {useState} from 'react';
import Layout from './shared/hoc/Layout/Layout';
import FeedList from './containers/FeedList';
import FeedDetail from './containers/FeedDetail';
import AddSourceForm from './shared/components/AddSourceForm';
import parseDomDocument from './shared/reusable/parse-dom-document';
import './App.scss';

function App() {
  
  const [dataList, setDataList] = useState([]);
  const [selectedFeedData, setSelectedFeedData] = useState([]);
  const [selectedFeedItem, setSelectedFeedItem] = useState({});
  const [showAddFeed, setShowAddFeed] = useState(false);

  const addSourceHandler = (data) => {
    let exists = false;
    dataList.map(item => {
      exists = item.title !== data.title ? false : true;
    })
    if(!exists){
      setDataList([
        ...dataList,
        data
      ])
    }
    setShowAddFeed(false);
  }
  const feedClickHandler = (data) => {
    // const RSS_URL = `https://cors-anywhere.herokuapp.com/${url}`;
    // fetch(RSS_URL)
    //   .then(response => response.text())
    //   .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    //   .then(data => {
    //     const feeds = parseDomDocument(data);
    //     setSelectedFeedData(feeds);
    //   })
    //   .catch(() => {
    //     fetch(url,{mode:'cors'})
    //       .then(response => response.text())
    //       .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    //       .then(data => {
    //         const feeds = parseDomDocument(data);
    //         setSelectedFeedData(feeds);
    //     })
    //     .catch(e=> {
    //       console.log(e)
    //     })
    //   })     
    console.log(data);
    setSelectedFeedData(data);
  }

  const addFeedClickHandler = () => {
    setShowAddFeed(true);
    console.log('yey');
  }
  const ModalClickHandler = () => {
    setShowAddFeed(false);
  }
  const feedItemClickHandler = (clickedFeedData) => {
    setSelectedFeedItem(clickedFeedData);
  }

  return (
    <>
      <Layout dataList={dataList} onFeedClick={feedClickHandler} onAddFeedClick={addFeedClickHandler}>
        <FeedList feedData={selectedFeedData} onFeedItemClick={feedItemClickHandler} />
        <FeedDetail feedItemData={selectedFeedItem} />
      </Layout>
      {showAddFeed ? <AddSourceForm onModalClick={ModalClickHandler} onAddSource={addSourceHandler}/> : null}
    </>
  );
}

export default App;
