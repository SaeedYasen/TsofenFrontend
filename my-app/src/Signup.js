import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    email: '',
    country_code: '',
    area_code: '',
    number: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/signup', formData);
      setMessage('Signup successful. You can now log in.');
      setFormData({
        username: '',
        password: '',
        name: '',
        surname: '',
        email: '',
        country_code: '',
        area_code: '',
        number: '',
      });
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          boxShadow: 7,
          borderRadius: 4,
          bgcolor: 'white',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Signup
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{message}</Alert>}

        {[
          { label: 'Username', name: 'username' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Name', name: 'name' },
          { label: 'Surname', name: 'surname' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Country Code', name: 'country_code' },
          { label: 'Area Code', name: 'area_code' },
          { label: 'Phone Number', name: 'number' },
        ].map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || 'text'}
            fullWidth
            margin="normal"
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
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
