import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material';
import { fetchFriends } from '../../features/friends/friendsSlice';
import { fetchMessages, sendMessage } from '../../features/chat/chatSlice';
import { addFriend } from '../../features/friends/friendsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const messages = useSelector((state) => state.chat.messages);
  const { user } = useSelector((state) => state.auth);

  const [newFriend, setNewFriend] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(friends[0]?.name || '');
  const [messageText, setMessageText] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [profileOpen, setProfileOpen] = useState(false); // State for opening profile dialog

  const currentUserProfile = {
    name: user?.username,
    profilePic: user?.avatar, // Add user's profile image path
    email: user?.email,
  };

  // Load friends and messages when component mounts
  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchMessages());
  }, [dispatch]);

  // Add new friend only if they are not already in the list
  const handleAddFriend = () => {
    if (newFriend.trim()) {
      const friendExists = friends.some((friend) => friend.name === newFriend);
      if (!friendExists) {
        dispatch(addFriend({ name: newFriend }));
        setOpen(false); // Close the dialog
        setNewFriend(''); // Clear input field
        setError(''); // Clear any previous error
      } else {
        setError('This friend is already added.');
      }
    }
  };

  // Send a message
  const handleSendMessage = () => {
    if (messageText.trim()) {
      dispatch(sendMessage({ from: 'Me', to: selectedFriend, text: messageText, time: new Date().toLocaleTimeString() }));
      setMessageText(''); // Clear input field after sending
    }
  };

  // Profile modal content
  const handleProfileOpen = () => {
    setProfileOpen(true);
  };

  return (
    <Box className="h-screen flex flex-col overflow-y-hidden" sx={{ backgroundColor: '#f4f6f9' }}>
      {/* Header */}
      <Box className="h-[7%] w-full p-2 flex justify-between bg-[#3f51b5]">
        <Box className="flex space-x-3">
          <Typography className="text-white text-4xl font-semibold ml-5">LOGO</Typography>
        </Box>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: '#ff4081' }}>
          Add New Friend
        </Button>
      </Box>

      {/* Main content */}
      <Box className="flex flex-grow">
        {/* Sidebar */}
        <Box className="w-[60px] p-2 border-r border-gray-300 bg-[#3f51b5] flex flex-col items-center">
          <Avatar src={currentUserProfile.profilePic} sx={{ width: 48, height: 48 }} onClick={handleProfileOpen} className="cursor-pointer" />
          {/* Additional sidebar icons can be added here */}
        </Box>

        {/* Friends Sidebar */}
        <Box className="bg-white border-t border-r border-gray-200 w-1/4 p-2">
          <Typography variant="h5" className="font-bold p-2 text-[#3f51b5]">
            Friends
          </Typography>
          <List className="overflow-auto h-full">
            {friends.map((friend, index) => (
              <ListItem
                key={index}
                className={`hover:bg-gray-200 cursor-pointer rounded-md ${friend.name === selectedFriend ? 'bg-[#d1c4e9]' : ''}`}
                onClick={() => setSelectedFriend(friend.name)}
              >
                <ListItemText primary={friend.name} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat window */}
        <Box className="flex flex-col w-3/4 h-full">
          {/* Chat Header */}
          <Paper
            square
            elevation={3}
            className="p-4"
            sx={{ backgroundColor: '#ffffff' }}
          >
            <Typography variant="h6" className="text-[#3f51b5]">{selectedFriend || 'Select a Friend to Chat'}</Typography>
          </Paper>

          {/* Chat Messages */}
          <Box
            className="flex-grow p-4 overflow-auto"
            sx={{ backgroundColor: '#fafafa' }}
          >
            {selectedFriend ? (
              messages
                .filter((msg) => msg.from === selectedFriend || msg.to === selectedFriend)
                .map((message, index) => (
                  <Box
                    key={index}
                    className={`mb-3 p-2 rounded-lg ${message.from === 'Me' ? 'bg-blue-100 ml-auto' : 'bg-gray-200'} max-w-xs`}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                    <Typography variant="caption" className="block text-right text-gray-500">
                      {message.time}
                    </Typography>
                  </Box>
                ))
            ) : (
              <Typography variant="body1" className="text-center text-gray-500">
                Select a friend to start chatting.
              </Typography>
            )}
          </Box>

          {/* Input Field */}
          {selectedFriend && (
            <Paper
              square
              elevation={3}
              className="flex items-center p-2"
              sx={{ backgroundColor: '#ffffff' }}
            >
              <TextField
                variant="outlined"
                placeholder="Type a message..."
                fullWidth
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ ml: 2, backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Paper>
          )}
        </Box>
      </Box>

      {/* Profile Dialog */}
      <Dialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        maxWidth="sm"
        PaperProps={{
          style: {
            width: '400px', 
            height: '300px', 
            borderRadius: '8px',
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: '#3f51b5', color: 'white' }}>My Profile</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
          <Avatar
            src={currentUserProfile.profilePic}
            sx={{ width: 80, height: 80, marginBottom: 2 }}
          />
          <Typography variant="h6" sx={{ marginTop: 1, fontWeight: 'bold' }}>
            {currentUserProfile.name}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 0.5, color: 'text.secondary' }}>
            {currentUserProfile.email}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileOpen(false)} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Friend Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a New Friend</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Friend's Name"
            type="text"
            fullWidth
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddFriend}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
