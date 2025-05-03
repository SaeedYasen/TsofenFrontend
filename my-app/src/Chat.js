import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Box, TextField, IconButton, List, ListItem, ListItemText, InputAdornment,
  Divider, Card, Typography, Button, Avatar, Tooltip, CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Previous Chat 1', timestamp: new Date() },
    { id: 2, title: 'Another Session', timestamp: new Date() },
    { id: 3, title: 'Quick Questions', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleDoctorSelection = (doctorName) => {
    // تحقق من أن الطبيب لم يتم اختياره بالفعل في آخر رسالة
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.text === doctorName) {
      return; // إذا كانت نفس الرسالة، لا تُرسلها
    }
  
    // إضافة رسالة الطبيب إلى الرسائل
    const doctorMessage = { text: doctorName, sender: 'user' };
    setMessages((prev) => [...prev, doctorMessage]);
  
    // فقط بعد إضافة الرسالة، قم بتصفير النص
    setInput('');
  
    // إرسال الرسالة
    handleSend(doctorName);
  };
  
  

  const handleSend = async (overrideText = null) => {
    const messageToSend = overrideText || input;
    if (messageToSend.trim() === '') return;
  
    // تحقق إن كانت نفس الرسالة آخر رسالة أرسلها المستخدم
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user' && lastMessage.text === messageToSend) {
      return; // تجاهل التكرار
    }
  
    const userMessage = { text: messageToSend, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:5000/api/analyze', {
        message: messageToSend,
        session_id: localStorage.getItem('username')
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const aiResponse = response.data.note;
      const nextStep = response.data.next_step;
      const message = response.data.message;
      const doctors = response.data.doctors;
  
      const newMessages = [];
  
      if (aiResponse) newMessages.push({ text: aiResponse, sender: 'ai' });
      if (doctors) newMessages.push({ text: message, doctors: doctors, sender: 'ai', type: 'doctor_list' });
      else if (message) newMessages.push({ text: message, sender: 'ai' });
      if (nextStep) newMessages.push({ text: nextStep, sender: 'ai' });
  
      setMessages((prev) => [...prev, ...newMessages]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { text: '⚠ حدث خطأ أثناء الاتصال بالخادم.', sender: 'ai', error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  const handleChatSelection = (chatId) => {
    console.log(`Selected chat: ${chatId}`);
    setMessages([{ text: `Loaded messages for chat ${chatId}`, sender: 'ai' }]);
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)', backgroundColor: '#fff' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '260px',
          backgroundColor: '#f8f8fb',
          borderRight: '1px solid #e0e0e0',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button color="warning" size="small" variant="outlined" disableElevation sx={{ mb: 2, padding: 2, borderRadius: 2 }}>
          <AddIcon sx={{ mr: 1 }} />
          CREATE NEW CHAT
        </Button>

        <Typography variant="overline" gutterBottom sx={{ paddingLeft: 2 }}>
          Chat History
        </Typography>
        <Divider sx={{ mb: 2, mr: 4 }} />

        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {chatHistory.map((chat) => (
            <Card
              key={chat.id}
              variant="outlined"
              onClick={() => handleChatSelection(chat.id)}
              sx={{
                mb: 2,
                mx: 1,
                px: 2,
                py: 1,
                borderRadius: 3,
                cursor: 'pointer',
                transition: '0.2s',
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 3,
                  backgroundColor: '#f0f0fa',
                },
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {chat.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {chat.timestamp.toLocaleString()}
              </Typography>
            </Card>
          ))}
        </List>
      </Box>

      {/* Chat Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          paddingRight: 6,
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            width: '100%',
            mb: 2,
            p: 2,
            backgroundColor: '#fdfdfd',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'secondary.main', width: 30, height: 30, mr: 1 }}>AI</Avatar>
            <Typography variant="subtitle1">GBooking AI</Typography>
          </Box>
          <Box>
            <Tooltip title="Clear Chat">
              <IconButton size="small" sx={{ ml: 1 }}>
                <ClearAllIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save Chat">
              <IconButton size="small" sx={{ ml: 1 }}>
                <SaveAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="More Options">
              <IconButton size="small" sx={{ ml: 1 }}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Messages */}
        <Box
          ref={chatContainerRef}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            px: 1,
            mb: 3,
          }}
        >
          <List>
            {messages.map((msg, i) => (
              <ListItem key={i} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <Box
                  sx={{
                    backgroundColor: msg.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    maxWidth: '70%',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* معالجة مواعيد */}
                  {msg.text.startsWith('🕑 هذه المواعيد المتاحة') ? (
                    <>
                      <Typography variant="body1">{msg.text.split(':')[0]}:</Typography>
                      <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                        {msg.text.match(/\d{2}:\d{2}/g)?.map((time, index) => (
                          <Button
                            key={index}
                            variant="outlined"
                            size="small"
                            onClick={() => handleSend(time)}
                            sx={{ borderRadius: 2, minWidth: '80px' }}
                          >
                            {time}
                          </Button>
                        ))}
                      </Box>
                      <Typography variant="body2" mt={1}>❓ أي ساعة تناسبك؟ اضغط على الزر.</Typography>
                    </>
                  ) : (
                    <Typography variant="body1">{msg.text}</Typography>
                  )}

                  {msg.type === 'doctor_list' && msg.doctors && (
                    <Box mt={1} display="flex" flexDirection="column" gap={1}>
                      {msg.doctors.map((doctor, idx) => (
                        <Button
                          key={idx}
                          variant="contained"
                          size="small"
                          sx={{ textTransform: 'none', alignSelf: 'flex-start' }}
                          onClick={() => handleDoctorSelection(doctor)}
                        >
                          {doctor}
                        </Button>
                      ))}
                    </Box>
                  )}
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {msg.sender === 'user' ? 'You' : 'AI'}
                  </Typography>
                </Box>
              </ListItem>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 2 }}>
                <CircularProgress size={20} />
              </Box>
            )}
          </List>
        </Box>

        {/* Input */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          sx={{
            borderRadius: '25px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              padding: '4px 12px',
              fontSize: '1rem',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleSend()} disabled={loading}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default Chat;
