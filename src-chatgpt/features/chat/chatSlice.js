
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated chat data
const chatMessages = [
  { id: 1, sender: 'john', message: 'Hello!', timestamp: '10:00 AM' },
  { id: 2, sender: 'jane', message: 'Hi there!', timestamp: '10:05 AM' },
];

// Fetch chat messages (simulated)
export const fetchMessages = createAsyncThunk('chat/fetchMessages', async () => {
  return chatMessages;  // returning hardcoded messages
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);  // Add new message
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
                    