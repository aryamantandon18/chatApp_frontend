import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Home from './components/Home/Home';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignupPage/> } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

// import React from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1a237e', // Dark blue primary color
//       contrastText: '#ffffff', // White text on primary button
//     },
//     secondary: {
//       main: '#ff9100', // Orange secondary color
//       contrastText: '#000000', // Black text on secondary button
//     },
//     error: {
//       main: '#d32f2f', // Red for error
//     },
//     background: {
//       default: '#f5f5f5', // Light background color
//     },
//   },
//   typography: {
//     h1: {
//       fontSize: '2.5rem', // Larger heading font
//       fontWeight: 700, // Bold font weight
//       color: '#1a237e', // Custom color for h1
//     },
//     body1: {
//       fontSize: '1rem', // Normal body text size
//       color: '#333333', // Custom text color for body
//     },
//     button: {
//       textTransform: 'none', // Disable uppercase transformation for buttons
//     },
//   },
//   spacing: 8, // Custom spacing unit (8px)
//   shadows: ['none', '0px 2px 10px rgba(0, 0, 0, 0.1)'], // Custom shadow array
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 960,
//       lg: 1280,
//       xl: 1920,
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 20, // Rounded corners for all buttons
//           padding: '8px 24px', // Custom padding for buttons
//         },
//         containedPrimary: {
//           backgroundColor: '#1a237e', // Override primary button background color
//           '&:hover': {
//             backgroundColor: '#0d194f', // Darker on hover
//           },
//         },
//         containedSecondary: {
//           backgroundColor: '#ff9100',
//           '&:hover': {
//             backgroundColor: '#e58a00', // Darker hover for secondary button
//           },
//         },
//       },
//     },
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           minHeight: '100vh',
//           bgcolor: 'background.default',
//         }}
//       >
//         <Paper
//           elevation={2}
//           sx={{
//             padding: theme.spacing(4),
//             textAlign: 'center',
//             maxWidth: '600px',
//           }}
//         >
//           <Typography variant="h1" gutterBottom>
//             Custom Themed Heading
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             This is a complex theme example where we are customizing multiple aspects of the Material-UI theme, including buttons, typography, and layout.
//           </Typography>
//           <Box sx={{ margin: theme.spacing(2) }}>
//             <Button variant="contained" color="primary">
//               Primary Button
//             </Button>
//           </Box>
//           <Box sx={{ margin: theme.spacing(2) }}>
//             <Button variant="contained" color="secondary">
//               Secondary Button
//             </Button>
//           </Box>
//           <Box sx={{ margin: theme.spacing(2) }}>
//             <Button variant="contained" color="error">
//               Error Button
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default App;

