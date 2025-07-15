
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MenuItems from './Components/MenuItem/MenuItems';
import Homepage from './Components/Homepage/Homepage';
import Calendar from './Components/Calender/Calender';
import UserList from './Components/Users/UserList';

import Charts from './Components/Charts/Charts';
import Header from './Components/Header/Header';

import LoginPage from './Pages/LoginPage/LoginPage';

import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Message from './Components/Message/Message';
import Notification from './Components/Notification/Notification';



function App() {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const STATIC_EMAIL = 'admin@example.com';
  const STATIC_PASSWORD = '1234';

  const handleLogin = (email, password) => {
    if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className={theme}>
      <Router>
        <Routes>
          {!isAuthenticated && (
            <>
              <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
            </>
          )}

          {isAuthenticated && (
            <Route
              path="/*"
              element={
                <div className="">
                  <div className="header">
                    <Header toggleTheme={toggleTheme} onLogout={handleLogout} />
                  </div>
                  <div className="content">
                    <div className="menu mt-4">
                      <MenuItems theme={theme} toggleTheme={toggleTheme} />
                    </div>
                    <div className="main">
                      <Routes>
                        <Route path="/homepage" element={<Homepage />} />
                        <Route path="/calendar" element={<Calendar />} />
                       
                        <Route path="/users" element={<UserList />} />
                       
                        <Route path="/chart" element={<Charts />} />
                        <Route path="/messages" element={<Message />} />
                        <Route path="/notifications" element={<Notification />} />
                        
                        <Route path="*" element={<Navigate to="/homepage" />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              }
            />
          )}

          {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;








