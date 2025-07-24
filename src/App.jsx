import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import MenuItems from "./Components/MenuItem/MenuItems";
import Homepage from "./Components/Homepage/Homepage";
import Calendar from "./Components/Calender/Calender";
import UserList from "./Components/Users/UserList";
import Charts from "./Components/Charts/Charts";
import Header from "./Components/Header/Header";

import LoginPage from "./Pages/LoginPage/LoginPage";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Message from "./Components/Message/Message";
import Notification from "./Components/Notification/Notification";
import AdminReviewForm from "./Components/AdminReviewForm/AdminReviewForm";

import useAuth from "./hooks/useAuth";
import VideoGallery from "./Components/VideoGallery/VideoGallery";
import Blogs from "./Components/Blogs/Blogs";
import AdminBlogList from "./Components/Blogs/AdminBlogList";
import ReviewTwo from "./Components/ReviewTwo/ReviewTwo";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const { token, login, logout } = useAuth();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!token) {
    return (
      <div className={theme}>
        <Routes>
          <Route path="/" element={<LoginPage onLogin={login} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={theme}>
      <Header toggleTheme={toggleTheme} onLogout={logout} />
      <div className="content">
        <div className="menu mt-4">
          <MenuItems theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div className="main">
          <Routes>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/adminreview" element={<AdminReviewForm />} />
            <Route path="/reviewtwo" element={<ReviewTwo />} />
            <Route path="/videourl" element={<VideoGallery />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogitem" element={<AdminBlogList />} />
            <Route path="/chart" element={<Charts />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="*" element={<Navigate to="/homepage" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppWrapper;
