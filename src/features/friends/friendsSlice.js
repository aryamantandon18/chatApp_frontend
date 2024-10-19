// src/features/friends/friendsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid'; // For generating unique IDs

// Hardcoded users data (representing all users in the system)
const usersData = [
  { id: 1, name: 'John Doe', profile: '/Profile/profile1' },
  { id: 2, name: 'Jane Smith', profile: '/Profile/profile2' },
  { id: 3, name: 'Aryaman Tandon', profile: '/Profile/profile3' },
  { id: 4, name: 'Sam Wilson', profile: '/Profile/profile4' }, // New user, not a friend yet
];

// Thunk for fetching all users
export const fetchUsers = createAsyncThunk('friends/fetchUsers', async () => {
  return usersData;
});

// Thunk for fetching friends (predefined friends data)
export const fetchFriends = createAsyncThunk('friends/fetchFriends', async () => {
  const friendsData = [
    { id: 1, name: 'John Doe', profile: '/Profile/profile1', friendOf: "currentUser" },
    { id: 2, name: 'Jane Smith', profile: '/Profile/profile2', friendOf: "currentUser" },
    { id: 3, name: 'Aryaman Tandon', profile: '/Profile/profile3', friendOf: "currentUser" },
    { id: 4, name: 'Emily Johnson', profile: '/Profile/profile4', friendOf: "currentUser" },
    { id: 5, name: 'Michael Brown', profile: '/Profile/profile5', friendOf: "currentUser" },
    { id: 6, name: 'Sarah Davis', profile: '/Profile/profile6', friendOf: "currentUser" },
    { id: 7, name: 'David Wilson', profile: '/Profile/profile7', friendOf: "currentUser" },
    { id: 8, name: 'Sophia Miller', profile: '/Profile/profile8', friendOf: "currentUser" },
    { id: 9, name: 'Daniel Garcia', profile: '/Profile/profile9', friendOf: "currentUser" },
    { id: 10, name: 'Olivia Martinez', profile: '/Profile/profile10', friendOf: "currentUser" },
  ];
  return friendsData;
});

const friendsSlice = createSlice({
  name: 'friends',
  initialState: { friends: [], users: [], status: 'idle', error: null },
  reducers: {
    addFriend: (state, action) => {
      // Check if the friend already exists in the friends list
      const friendExists = state.friends.some(friend => friend.id === action.payload.id);

      if (!friendExists) {
        // Add the new friend
        state.friends.push({
          id: action.payload.id,
          name: action.payload.name,
          profile: action.payload.profile,
          friendOf: action.payload.friendOf,  // Associate the friend with the current user
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { addFriend } = friendsSlice.actions;
export default friendsSlice.reducer;
