
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Hardcoded users for simulation
const users = [
  { id: 1, username: 'john', password: '123', name: 'John Doe' },
  { id: 2, username: 'jane', password: '456', name: 'Jane Smith' },
];

// createAsyncThunk to simulate login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
                    