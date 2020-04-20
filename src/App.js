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
      data.items.map(item => {
        item.sourceTitle = data.title;
        item.favicon = data.favicon;
        item.favourite = false;
      })
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
    setSelectedFeedData(data);
    setSelectedFeedItem({});     

  }

  const addFeedClickHandler = () => {
    setShowAddFeed(true);
  }
  const ModalClickHandler = () => {
    setShowAddFeed(false);
  }
  const feedItemClickHandler = (clickedFeedData) => {
    setSelectedFeedItem(clickedFeedData);
  }

  const toggleFavouriteHandler = () => {
    let index = selectedFeedData.items.indexOf(selectedFeedItem);
    if(selectedFeedItem.favourite === false){
      setSelectedFeedItem({...selectedFeedItem, favourite: true})
      selectedFeedData.items[index].favourite = true;
    }else if(selectedFeedItem.favourite === true){
      setSelectedFeedItem({...selectedFeedItem, favourite: false})
      selectedFeedData.items[index].favourite = false;
    }
  }

  const allFeedsClickHandler = () => {

  }

  return (
    <>
      <Layout dataList={dataList} onFeedClick={feedClickHandler} onAddFeedClick={addFeedClickHandler} onAllFeedsClick={allFeedsClickHandler}>
        <FeedList feedData={selectedFeedData} onFeedItemClick={feedItemClickHandler} />
        <FeedDetail feedItemData={selectedFeedItem} onFavButtonClick={toggleFavouriteHandler} />
      </Layout>
      {showAddFeed ? <AddSourceForm onModalClick={ModalClickHandler} onAddSource={addSourceHandler}/> : null}
    </>
  );
}

export default App;
