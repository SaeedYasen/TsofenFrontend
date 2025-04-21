// DashboardLayout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Drawer, ListItem, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, ChatBubbleOutline, NotificationsNone, Logout } from '@mui/icons-material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import Settings from '@mui/icons-material/Settings';

function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', width: 1900 }}>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: 260,
            backgroundColor: '#f8f9fa',
          },
        }}
      >
        <List sx={{padding:1, mb:-7, mt:-10}}>
        <ListItem>
          <ListItemButton sx={{ padding: '10px 25px', marginTop: 20 }} onClick={() => navigate('/dashboard')}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ margin: '12px 1px' }} />

        <ListItem>
          <ListItemButton sx={{ padding: '12px 25px' }} onClick={() => navigate('/dashboard/chat')}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ChatBubbleOutline />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ margin: '12px 1px' }} />

        <ListItem>
          <ListItemButton sx={{ padding: '12px 25px' }} onClick={() => navigate('/dashboard/chat')}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <BookOnlineIcon />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ margin: '12px 1px' }} />

        <ListItem>
          <ListItemButton sx={{ padding: '12px 25px', marginBottom: 58 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <NotificationsNone />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>
        </ListItem>
      </List>

      <List sx={{display:'flex',  mt:-13}}>
        <ListItem>
            <ListItemButton sx={{ padding: '12px 25px' }} onClick={() => navigate('/dashboard/Settings')}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
      </List>

        <Divider sx={{ margin: '12px 1px' }} />
        <List sx={{mt:-1}} >   
          <ListItem onClick={handleLogout}>
            <ListItemButton sx={{ padding: '12px 25px' }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 2, px: 1, py: 10, marginLeft: 34 }}>
        <Outlet />
      </Box>
    </Box>

  );
}

export default DashboardLayout;