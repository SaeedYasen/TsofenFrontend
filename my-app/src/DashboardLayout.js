// DashboardLayout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, ChatBubbleOutline, NotificationsNone, Logout } from '@mui/icons-material';

function DashboardLayout() {
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
          <ListItemButton sx={{ padding: '12px 25px', marginTop: 20 }} onClick={() => navigate('/dashboard')}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton sx={{ padding: '12px 25px' }} onClick={() => navigate('/dashboard/chat')}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ChatBubbleOutline />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton sx={{ padding: '12px 20px', marginBottom: 58 }}>
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

      {/* Main content will be rendered here */}
      <Box sx={{ p: 3, marginLeft: 90, marginTop: 40, width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
