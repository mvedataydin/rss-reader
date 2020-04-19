

const parseDomDocument = (data) => {
  const feedSource = (data.querySelector('title'))? data.querySelector('title').innerHTML : null;

  const sourceUrl = (data.querySelector('link'))? data.querySelector('link').innerHTML : null;
  const sourceIconUrl = (data.querySelector('icon'))? data.querySelector('icon').innerHTML : null;
  const items = data.querySelectorAll('item').length !== 0 ? Array.from(data.querySelectorAll('item'))
  : data.querySelectorAll('entry').length !== 0 ? Array.from(data.querySelectorAll('entry')) : null;

  const feeds = items.map(item =>{
    const feedTitle = item.querySelector('title') ? item.querySelector('title').innerHTML : null;
    
    const feedDesc = item.querySelector('description') ? item.querySelector('description') 
    : item.querySelector('content') ? item.querySelector('content') : null;

    const feedAuthor = item.querySelector('creator') ? item.querySelector('creator').innerHTML 
    : item.querySelector('author') ? item.querySelector('author').querySelector('name').innerHTML : null;
   
    const feedLink = item.querySelector('guid') ? item.querySelector('guid').innerHTML 
    : item.querySelector('id') ? item.querySelector('id').innerHTML : null  ;
    
    const feedDate = item.querySelector('pubDate') ? item.querySelector('pubDate').innerHTML 
    : item.querySelector('published') ? item.querySelector('published').innerHTML : null  ;
    
    const formattedDate = formatDate(feedDate);

    const feedData = {
      source: feedSource,
      sourceLink: sourceUrl,
      sourceIconLink: sourceIconUrl,
      title: feedTitle,
      description: feedDesc,
      author: feedAuthor,
      link: feedLink,
      date: formattedDate
    };
    return feedData;
  })
  return feeds;
};


const formatDate = (dateString) => {
  if(dateString == null){
    return null;
  }
  let date;
  if(dateString.includes('-')){
    let dateTemp = dateString.split('T')[0];
    let dateArr = dateTemp.split('-');
    let month = parseInt(dateArr[1]);

    switch(month){
      case 1: dateArr[1] = "Jan";
          break;
      case 2: dateArr[1] = "Feb";
          break;
      case 3: dateArr[1] = "Mar";
          break;
      case 4: dateArr[1] = "Apr";
          break;
      case 5: dateArr[1] = "May";
          break;
      case 6: dateArr[1] = "Jun"; 
          break;
      case 7: dateArr[1] = "Jul";
          break;
      case 8: dateArr[1] = "Aug";
          break;
      case 9: dateArr[1] = "Sep";
          break;
      case 10: dateArr[1] = "Oct";
          break;
      case 11: dateArr[1] = "Nov";
          break;
      case 12: dateArr[1] = "Dec";
          break;
          default: dateArr[1] = month;
      }
      date = dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[0];
      return date;
  }
  if(dateString.includes(',')){
    let dateArr = dateString.split(' ');
    date = dateArr[1] + ' ' + dateArr[2] + ' ' + dateArr[3];
    return date;
  }
}

export default parseDomDocument;