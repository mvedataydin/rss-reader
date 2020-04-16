import React, {useState} from 'react';

const AddSourceForm = props => {

  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredUrl, setEnteredUrl] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddSource(enteredTitle,enteredUrl);
    setEnteredTitle('');
    setEnteredUrl('');
  }
  return(
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor='feed-url'>Enter rss feed url</label>
        <input type='text' id='feed-url' value={enteredUrl} 
        onChange={ event => {
          setEnteredUrl(event.target.value);
        }} 
        />
        
        <label htmlFor='feed-title'>Enter a name for feed</label>
        <input type='text' id='feed-title' value={enteredTitle} 
        onChange={ event => {
          setEnteredTitle(event.target.value);
        }} 
        />

        <button type='submit'>Add</button>
      </form>
    </>
  )
};

export default AddSourceForm;