// Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, List, ListItem, ListItemText, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const apiKey = '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'; // Make sure you have this in your .env file

  useEffect(() => {
    // Scroll to the bottom whenever messages update
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setMessages((prevMessages) => [...prevMessages, { text: inputText, sender: 'user' }]);
    setInputText('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003', // Or another preferred model
          messages: [...messages, { role: 'user', content: inputText }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Oops! Something went wrong with the AI.', sender: 'ai', error: true },
        ]);
      } else {
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
      }
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'There was a problem communicating with the AI.', sender: 'ai', error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '520px', 
        padding: 3,
      }}
    >
      <Box
        ref={chatContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: 2,
          padding: 1,
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <ListItemText
                primary={message.text}
                secondary={message.sender === 'user' ? 'You' : 'AI'}
                sx={{
                  backgroundColor: message.sender === 'user' ? '#e0f7fa' : '#f0f0f0',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                }}
                secondaryTypographyProps={{
                  align: message.sender === 'user' ? 'right' : 'left',
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
  );
};

export default Chat;