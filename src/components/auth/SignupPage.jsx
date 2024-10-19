// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../features/auth/authSlice';
import { Box, TextField, Button, Typography, Alert, Paper, CircularProgress, Stack, Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from '../styles/StyledComponents';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector(state => state.auth);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    if (avatar) {
      formData.append('avatar', avatar); 
    }
    dispatch(signupUser(formData)); 
    if (status === 'succeeded') {
      navigate('/home');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          SignUp Here
        </Typography>
        <Stack position={"relative"} width={"10rem"} margin={"auto"}>
          <Avatar
            sx={{
              width: "10rem",
              height: "10rem",
              objectFit: "contain",
            }}
            src={avatarPreview}
          />  
          <IconButton 
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              ":hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
            component="label"
          >
            <CameraAltIcon />
            <VisuallyHiddenInput
              type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setAvatar(file);
                    const reader = new FileReader();
                    reader.onloadend = () => setAvatarPreview(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />

          </IconButton>
        </Stack>
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant='outlined'
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : 'Signup'}
          </Button>
          {status === 'failed' && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account? <a href="/login" style={{ color: '#1976d2' }}>Login in</a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default SignupPage;
