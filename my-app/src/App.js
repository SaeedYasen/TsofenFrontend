import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Chat from './Chat';
import Home from './Home';
import Settings from './Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="chat" element={<Chat />} />
         <Route path='Settings' element={<Settings /> } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
