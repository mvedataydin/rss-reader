import React, {useState} from 'react';
import axios from 'axios';
import Layout from './shared/hoc/Layout/Layout';
import FeedList from './containers/FeedList';
import FeedDetail from './containers/FeedDetail';
import AddSourceForm from './shared/components/AddSourceForm';
import './App.scss';
import { Save } from 'react-feather';

function App() {
  
  const [dataList, setDataList] = useState([]);
  const [selectedFeedData, setSelectedFeedData] = useState([]);
  const [selectedFeedItem, setSelectedFeedItem] = useState({});
  const [showAddFeed, setShowAddFeed] = useState(false);
  const [showAllFeeds, setShowAllFeeds] = useState(false);
  const [showFavFeeds, setShowFavFeeds] = useState(false);

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
      indexDataToElasticSearch(data.items);
    }
    setShowAddFeed(false);
  }
  const feedClickHandler = (data) => {
    setSelectedFeedData(data);
    setShowAllFeeds(false);
    setShowFavFeeds(false);
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
      let data = {...selectedFeedData}
      let item = {...data.items[index]}
      item.favourite = true;
      data.items[index] = item;
      setSelectedFeedData(data);
    }else if(selectedFeedItem.favourite === true){
      setSelectedFeedItem({...selectedFeedItem, favourite: false})
      let data = {...selectedFeedData}
      let item = {...data.items[index]}
      item.favourite = false;
      data.items[index] = item;
      setSelectedFeedData(data);
    }
  }

  const allFeedsClickHandler = () => {
    setShowAllFeeds(true);
    setShowFavFeeds(false);
    setSelectedFeedItem({});     

  }
  const favFeedsClickHandler = () => {
    setShowFavFeeds(true);
    setShowAllFeeds(false);
    setSelectedFeedItem({});     

  }
  const indexDataToElasticSearch = async (data) => {
    let res = await axios.post('http://127.0.0.1:3001/index', data)

    console.log(`Status code: ${res.status}`);
    console.log(`Status text: ${res.statusText}`);
    console.log(`Request method: ${res.request.method}`);
    console.log(`Path: ${res.request.path}`);

    console.log(`Date: ${res.headers.date}`);
    console.log(`Data: ${res.data}`);

  }
  return (
    <>
      <Layout dataList={dataList} onFeedClick={feedClickHandler} onAddFeedClick={addFeedClickHandler} onAllFeedsClick={allFeedsClickHandler} onFavFeedsClick={favFeedsClickHandler}>
        <FeedList feedData={showAllFeeds ? dataList : showFavFeeds ? dataList : selectedFeedData} onFeedItemClick={feedItemClickHandler} showFav={showFavFeeds} showAll={showAllFeeds}/>
        <FeedDetail feedItemData={selectedFeedItem} onFavButtonClick={toggleFavouriteHandler} />
      </Layout>
      {showAddFeed ? <AddSourceForm onModalClick={ModalClickHandler} onAddSource={addSourceHandler}/> : null}
    </>
  );
}

export default App;
