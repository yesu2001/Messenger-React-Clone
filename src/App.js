import './App.css';
import React, {useState,useEffect} from 'react';
import Message from './Message.js';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import db from './firebase.js';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
function App() {
  const [input,setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection("messages").orderBy('timestamp','desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])

  useEffect(()=> {
    setUsername(prompt('Please enter your name'));
  },[])

  // function for sending message
  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('');
  }

  return (
    <div className="App">
    
      <div className="header">
        <h1>Messenger</h1>
        <h2>Welcome {username}</h2>
      </div>
      
      <form className="app_form">
        <FormControl>
          <Input className="form_input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)}></Input>
          <Button className="form_btn" disabled={!input} type="submit" variant="contained" color="primary" onClick={sendMessage}>Send</Button>
        </FormControl>
      </form>

      {/* messages */}
      <FlipMove>
        {
          messages.map(({id,message}) => (
            <Message key={id} username={username} message={message}/>
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
