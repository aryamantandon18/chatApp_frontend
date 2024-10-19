
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../features/chat/chatSlice';

function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch();
  const { messages, status } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSend = () => {
    if (newMessage.trim()) {
      dispatch(sendMessage({ id: Date.now(), sender: 'me', message: newMessage, timestamp: new Date().toLocaleTimeString() }));
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        <h3>Chat</h3>
        {status === 'loading' ? <p>Loading...</p> : null}
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender}:</strong> {msg.message} <em>{msg.timestamp}</em>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;
                