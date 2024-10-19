// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

// Hardcoded users
let users = [
  { id: 1, email: 'aryaman@gmail.com', password: 'aryaman', username: 'aryaman', avatar: null },
  { id: 2, email: 'virat@gmail.com', password: 'virat', username: 'virat', avatar: null },
];

// Thunk for logging in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    return user;
  }
);

// Thunk for signing up a user
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (formData) => {
    const existingUser = users.find((u) => u.email === formData.get('email'));
    if (existingUser) throw new Error('User with this email already exists');
    const avatarUrl = formData.get('avatar') ? URL.createObjectURL(formData.get('avatar')) : null;
    const newUser = {
      id: nanoid(),
      email: formData.get('email'),
      password: formData.get('password'),
      username: formData.get('username'),
      avatar: avatarUrl, // Store avatar URL
    };
    users.push(newUser);
    return newUser;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
