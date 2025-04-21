import React, { useState } from 'react';
import {Box,Button,TextField,Typography,Alert,Paper,Stack,Avatar,IconButton,CircularProgress} from '@mui/material';
import axios from 'axios';
import { Edit as EditIcon } from '@mui/icons-material';

const Settings = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5000/auth/update-profile',
        { newUsername, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.msg);
      setError('');
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '78vh',
        display: 'flex',
        boxShadow: 3,
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        bgcolor: '#ffffff',
        p: 3,
      }}
    >
      <Paper elevation={4} sx={{ p: 6, borderRadius: 6, width: '100%', maxWidth: 450 }}>
        <Typography variant="h4" align="center" gutterBottom mb={4} sx={{ fontWeight: 'bold' }}>
          Update Your Profile
        </Typography>

        <Stack spacing={4}>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <Box display="flex" justifyContent="center">
            <Avatar
              alt="Profile Picture"
              src="https://via.placeholder.com/150"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <IconButton sx={{ position: 'absolute', bottom: 0, right: 0 }}>
              <EditIcon color="primary" />
            </IconButton>
          </Box>

          <TextField
            label="New Username"
            fullWidth
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />


          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Settings;
