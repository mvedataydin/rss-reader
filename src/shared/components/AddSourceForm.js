import React, {useState} from 'react';
import RSSParser from 'rss-parser';
import classes from './AddSourceForm.module.scss';
import {Plus} from 'react-feather';
const AddSourceForm = props => {

  const [enteredUrl, setEnteredUrl] = useState('');
  const [showError, setShowError] = useState(false);

  const submitHandler = async event => {
    event.preventDefault();
    let parser = new RSSParser({
      defaultRSS: 2.0,
      timeout: 3000
    });
    let data;
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    try{
      data = await parser.parseURL(CORS_PROXY + enteredUrl);

    }catch{
      try{
        data = await parser.parseURL(enteredUrl);
      }catch{
        console.log('Invalid rss url');
        setShowError(true);
      }

    }
    
    if(data){
      let url = enteredUrl.split(/([^\/]*\/){3}/) ;
      url = enteredUrl.includes('http') ? url[1] : url[1];
      let favicon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`;
      data = {...data, favicon: favicon};
      setShowError(false);
      props.onAddSource(data);
      setEnteredUrl('');
    }
  }
  return(
    <>
    <div className={classes.Modal} onClick={props.onModalClick}></div>
    {showError ? <div className={classes.NotFound}>No Feed Found</div> : null}
    <div className={classes.AddSourceForm}>
      <form onSubmit={submitHandler} >
        <span>Add</span>
        <Plus size={18}/>
        <input type='text' id='feed-url' value={enteredUrl} placeholder = 'Enter website or feed url'
        onChange={ event => {
          setEnteredUrl(event.target.value);
        }} 
        />
      </form>
    </div>
    </>

  )
};

export default AddSourceForm;