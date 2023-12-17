import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ScrollToTop from './ScrollToTop';
import Header from './common/Header';
import UserList from './pages/UserList/UserList';
import Login from './pages/Login/Login';
import PostList from './pages/PostList/PostList';
import { Container } from '@mui/material';
import FeedList from './pages/Feed/FeedList';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Container>
        <Routes>
          <Route path="/" element={<FeedList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feeds" element={<FeedList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
