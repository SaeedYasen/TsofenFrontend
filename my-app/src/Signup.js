import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, { username, password });
      setMessage('Signup successful. You can now log in');
      setUsername('');
      setPassword('');
    } catch (err) {
      setError('Signup failed');
    }
  };

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
          Signup
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            {message}
          </Alert>
        )}

        <TextField
          label="Username"
          fullWidth
          margin="normal"
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
          onClick={handleSignup}
        >
          Signup
        </Button>

        <Typography sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Signup;