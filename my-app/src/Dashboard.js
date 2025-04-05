import React from 'react';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, ChatBubbleOutline, NotificationsNone, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };
  
    return (
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: 260,
              backgroundColor: '#f8f9fa',
            },
          }}
        >
              <ListItem>
                <ListItemButton sx={{ padding: '12px 25px', marginTop: 20}}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
  
              <ListItem>
                <ListItemButton sx={{ padding: '12px 25px' }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <ChatBubbleOutline />
                  </ListItemIcon>
                  <ListItemText primary="Chat" />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton sx={{ padding: '12px 20px', marginBottom:58 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <NotificationsNone />
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
                </ListItemButton>
              </ListItem>

            <Divider sx={{ margin: '12px 1px' }} />
              <ListItem onClick={handleLogout}>
                <ListItemButton sx={{ padding: '12px 25px' }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItemButton>
              </ListItem>

        </Drawer>
  
        <Box sx={{p: 3, marginLeft: 90, marginTop: 40 }}>
          <h1>Welcome to the Dashboard</h1>
        </Box>
      </Box>
    );
  }
  
export default Dashboard;