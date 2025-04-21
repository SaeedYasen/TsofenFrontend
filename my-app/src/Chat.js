import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, List, ListItem, ListItemText, InputAdornment, Divider, Card, Typography, Button, Avatar, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Previous Chat 1', timestamp: new Date() },
    { id: 2, title: 'Another Session', timestamp: new Date() },
    { id: 3, title: 'Quick Questions', timestamp: new Date() },
  ]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const topBarRef = useRef(null);

  
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { text: inputText, sender: 'user' }]);
    setInputText('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      const aiResponse = data.response;
      const nextStep = data.next_step;

      setMessages((prev) => [
        ...prev,
        { text: aiResponse, sender: 'ai' },
        ...(nextStep ? [{ text: nextStep, sender: 'ai' }] : []),
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'خطأ أثناء الاتصال بالخادم.', sender: 'ai', error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  const handleChatSelection = (chatId) => {
    console.log(`Selected chat: ${chatId}`);
    setMessages([
      { text: `Loaded messages for chat ${chatId}`, sender: 'ai' },

    ]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '80vh',
        borderRadius: 6,
        padding: 1,
        overflow: 'hidden',
        boxShadow: 'none',
        backgroundColor: '#f9f9fe',
      }}
    >


      <Box
        sx={{
          width: '30%',
          backgroundColor: '#f9f9fe',
          borderRight: '1px solid #e0e0e0',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        

        <Button color='warning' size='small' variant='outlined'  disableElevation sx={{ mb: 2, padding: 2, borderRadius: 2}}>
          <AddIcon sx={{ mr: 1 }} />
          CREATE NEW CHAT
        </Button>

        <Typography variant="overline" gutterBottom sx={{ paddingLeft: 23 }}>
          Chat History
        </Typography>
        <Divider sx={{ opacity: 2, mb: 2, mr: 5 }} />

        <List sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
          {chatHistory.map((chat) => (
            <Card
              key={chat.id}
              variant="outlined"
              onClick={() => handleChatSelection(chat.id)}
              sx={{
                mb: 2,
                mx: 2,
                borderRadius: 3,
                cursor: 'pointer',
                transition: '0.2s',
                justifyItems: 'center',
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 3,
                  backgroundColor: '#f5f5f9',
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {chat.title}
              </Typography>
              <Typography  color="text.secondary">
                {chat.description}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                {chat.timestamp.toLocaleString()}
              </Typography>
            </Card>
          ))}
        </List>
      </Box>


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: 6,
          width: '70%',
        }}
      >

        <Box
          ref={topBarRef}
          sx={{
            width: '100%',
            marginLeft: 7,
            marginTop: -5,
            marginBottom: 2,
            padding: 2,
            backgroundColor: '#fff',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box display="flex" alignItems="center" padding={1} ml={1}>
            <Avatar sx={{ mr: 1, bgcolor: 'secondary.main', width: 30, height: 30 }}>AI</Avatar>
            <Typography variant="subtitle1" component="div">
              GBooking AI
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Clear Chat">
              <IconButton size="small" sx={{ ml:2, padding: '6px' }}>
                <ClearAllIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save Chat">
              <IconButton size="small" sx={{ ml: 2, padding: '6px' }}>
                <SaveAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="More Options">
              <IconButton size="small" sx={{ ml: 2, padding: '6px' }}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>


        <Box
          ref={chatContainerRef}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            marginBottom: 2,
            padding: 1,
            width: '100%',
          }}
        >
          <List>
            {messages.map((msg, i) => (
              <ListItem key={i} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', padding: '8px 0' }}>
                <ListItemText
                  primary={msg.text}
                  secondary={msg.sender === 'user' ? 'You' : 'AI'}
                  sx={{
                    backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#f5f5f5',
                    padding: '10px 15px',
                    borderRadius: '10px',
                    maxWidth: '70%',
                    wordBreak: 'break-word',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  }}
                  secondaryTypographyProps={{
                    align: msg.sender === 'user' ? 'right' : 'left',
                    fontSize: '0.8rem',
                    color: 'text.secondary',
                  }}
                />
              </ListItem>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}
          </List>
        </Box>


        <TextField
          fullWidth
          variant="outlined"
          placeholder="Send a message..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          autoFocus
          sx={{
            marginBottom: 4,
            borderRadius: '25px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              padding: '2px 12px',
              fontSize: '1rem',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSendMessage} disabled={loading}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Chat;