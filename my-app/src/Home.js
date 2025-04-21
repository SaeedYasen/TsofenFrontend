import React from 'react';
import { Button, Card, CardContent, Grid, Typography, Paper } from '@mui/material';
import { Chat as ChatIcon, AccountCircle as AccountIcon, EventAvailable as EventIcon } from '@mui/icons-material';

const Home = () => {
  return (
      <Paper sx={{ p: 4, borderRadius: 12, boxShadow: 3, background: '#ffffff', height: '100%' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            mb: 4,
            color: '#1976d2',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Welcome to Your Dashboard
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: 3,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #81c784, #66bb6a)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardContent>
                <ChatIcon sx={{ fontSize: 40, color: '#fff', marginBottom: 2 }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: 2,
                    color: '#fff',
                  }}
                >
                  Start a New Chat
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 3,
                    fontSize: '1rem',
                    color: '#fff',
                  }}
                >
                  Use our GPT integration system to book a new appointment.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  Go to Chat
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Manage Account Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 3,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #64b5f6, #42a5f5)',
                transform: 'translateY(0)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardContent>
                <AccountIcon sx={{ fontSize: 40, color: '#fff', marginBottom: 2 }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: 2,
                    color: '#fff',
                  }}
                >
                  Manage Your Account
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 3,
                    fontSize: '1rem',
                    color: '#fff',
                  }}
                >
                  Edit your username, password, or update your settings.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#0288d1',
                    '&:hover': {
                      backgroundColor: '#0277bd',
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Appointments Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 3,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffeb3b, #ff9800)',
                transform: 'translateY(0)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardContent sx={{width: 450}}>
                <EventIcon sx={{ fontSize: 40, color: '#fff', marginBottom: 2 }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: 2,
                    color: '#fff',
                  }}
                >
                  View Appointments
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 3,
                    fontSize: '1rem',
                    color: '#fff',
                  }}
                >
                  Check and manage your upcoming appointments easily.
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    textTransform: 'none',
                    padding: 1,
                    backgroundColor: '#ff9800',
                    '&:hover': {
                      backgroundColor: '#fb8c00',
                    },
                  }}
                >
                  View Appointments
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
  );
};

export default Home;
