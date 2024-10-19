// src/features/chat/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Hardcoded chat messages
const messagesData = [
  { id: 1, sender: 'john', message: 'Hello!', timestamp: '10:00 AM' },
  { id: 2, sender: 'jane', message: 'Hi, how are you?', timestamp: '10:05 AM' },
];

// Thunk for fetching messages
export const fetchMessages = createAsyncThunk('chat/fetchMessages', async () => {
  return messagesData;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: { messages: [], status: 'idle', error: null },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
