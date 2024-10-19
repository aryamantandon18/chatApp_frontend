// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { Box, TextField, Button, Typography, Alert, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector(state => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    if(status == 'succeeded'){
      setEmail('');
      setPassword('');
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
      <Paper elevation={6} sx={{ padding: 4, width: 450 }}>
        {user ? (
          <Typography variant="h5" align="center" gutterBottom>
            Welcome, {user.name}!
          </Typography>
        
        ) : (
          <>
            <Typography variant="h4" align="center" gutterBottom >
              Login 
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
              <TextField
                label="email"
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
                {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
              {status === 'failed' && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don't have an account? <a href="/signup" style={{ color: '#1976d2' }}>Sign up</a>
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default LoginPage;


// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import {
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   FormHelperText,
//   Grid,
//   Box,
//   Typography,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers';
// import { useState } from 'react';

// // Validation schema using Yup
// const validationSchema = Yup.object({
//   firstName: Yup.string().required('First name is required'),
//   lastName: Yup.string().required('Last name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   gender: Yup.string().required('Gender is required'),
//   dob: Yup.date().nullable().required('Date of birth is required'),
//   file: Yup.mixed().required('File upload is required'),
//   terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
// });

// const ComplexForm = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const initialValues = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: '',
//     dob: null,
//     terms: false,
//     file: null,
//   };

//   const handleFileChange = (event, setFieldValue) => {
//     setFieldValue('file', event.currentTarget.files[0]);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           console.log('Form Values', values);
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({ errors, touched, handleSubmit, setFieldValue }) => (
//         <Box sx={{ padding: 4 }}>
//           <Typography variant="h4" gutterBottom>
//             Complex Form Example
//           </Typography>
//           <Form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               {/* First Name Field */}
//               <Grid item xs={12} sm={6}>
//                 <Field
//                   name="firstName"
//                   as={TextField}
//                   label="First Name"
//                   fullWidth
//                   error={touched.firstName && Boolean(errors.firstName)}
//                   helperText={touched.firstName && errors.firstName}
//                 />
//               </Grid>

//               {/* Last Name Field */}
//               <Grid item xs={12} sm={6}>
//                 <Field
//                   name="lastName"
//                   as={TextField}
//                   label="Last Name"
//                   fullWidth
//                   error={touched.lastName && Boolean(errors.lastName)}
//                   helperText={touched.lastName && errors.lastName}
//                 />
//               </Grid>

//               {/* Email Field */}
//               <Grid item xs={12}>
//                 <Field
//                   name="email"
//                   as={TextField}
//                   label="Email"
//                   type="email"
//                   fullWidth
//                   error={touched.email && Boolean(errors.email)}
//                   helperText={touched.email && errors.email}
//                 />
//               </Grid>

//               {/* Gender Field (Radio Group) */}
//               <Grid item xs={12}>
//                 <Field name="gender">
//                   {({ field }) => (
//                     <FormControl component="fieldset" error={touched.gender && Boolean(errors.gender)}>
//                       <RadioGroup row {...field}>
//                         <FormControlLabel value="male" control={<Radio />} label="Male" />
//                         <FormControlLabel value="female" control={<Radio />} label="Female" />
//                         <FormControlLabel value="other" control={<Radio />} label="Other" />
//                       </RadioGroup>
//                       {touched.gender && errors.gender && (
//                         <FormHelperText>{errors.gender}</FormHelperText>
//                       )}
//                     </FormControl>
//                   )}
//                 </Field>
//               </Grid>

//               {/* Date of Birth (Date Picker) */}
//               <Grid item xs={12}>
//                 <Field name="dob">
//                   {({ field }) => (
//                     <DatePicker
//                       label="Date of Birth"
//                       value={selectedDate}
//                       onChange={(date) => {
//                         setSelectedDate(date);
//                         setFieldValue('dob', date);
//                       }}
//                       renderInput={(props) => (
//                         <TextField
//                           {...props}
//                           fullWidth
//                           error={touched.dob && Boolean(errors.dob)}
//                           helperText={touched.dob && errors.dob}
//                         />
//                       )}
//                     />
//                   )}
//                 </Field>
//               </Grid>

//               {/* File Upload */}
//               <Grid item xs={12}>
//                 <input
//                   accept="image/*"
//                   id="file-upload"
//                   type="file"
//                   onChange={(event) => handleFileChange(event, setFieldValue)}
//                   style={{ display: 'none' }}
//                 />
//                 <label htmlFor="file-upload">
//                   <Button variant="contained" component="span">
//                     Upload File
//                   </Button>
//                 </label>
//                 {touched.file && errors.file && (
//                   <FormHelperText error>{errors.file}</FormHelperText>
//                 )}
//               </Grid>

//               {/* Terms and Conditions */}
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Field name="terms" as={Checkbox} color="primary" />
//                   }
//                   label="I accept the terms and conditions"
//                 />
//                 {touched.terms && errors.terms && (
//                   <FormHelperText error>{errors.terms}</FormHelperText>
//                 )}
//               </Grid>

//               {/* Submit Button */}
//               <Grid item xs={12}>
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </Form>
//         </Box>
//       )}
//     </Formik>
//   );
// };

// export default ComplexForm;
