import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  // const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMessage('');
  
  try {
    const response = await axios.post("http://127.0.0.1:5000/auth/login", { username, password });
    const receivedToken = response.data.token;
    if (receivedToken) {
      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);
    } else {
      setErrorMessage('Login failed. No token received.');
    }
  } catch (error) {
    setErrorMessage('Invalid credentials, please try again');
  }
};


  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 25,
          marginLeft: -8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 12,
          boxShadow: 7,
          borderRadius: 4,
          bgcolor: 'white',
          width: '100%',
        }}
      >
        <Typography variant="h5" sx={{ mb: 5 }}>
          Login
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 5 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography sx={{ mt: 2 }}>
          Don’t have an account?{' '}
          <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
            Sign up
          </Link>
        </Typography>

        {token && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
            Logged in successfully!
          </Alert>
        )}
        
        
      </Box>
    </Container>
  );
}

export default Login;