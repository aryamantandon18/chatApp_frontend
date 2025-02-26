
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
import friendsReducer from '../features/friends/friendsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    friends: friendsReducer,
  },
});
                