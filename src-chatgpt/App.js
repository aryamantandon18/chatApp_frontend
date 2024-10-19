
import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Chat from './components/Chat';
import Friends from './components/Friends';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div>
          <h1>Welcome to the Chat App</h1>
          <Friends />
          <Chat />
        </div>
      )}
    </div>
  );
}

export default App;
            