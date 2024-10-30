import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/Login';
import Register from './Components/Register';
import Todo from './Components/Todo';
import CookieBanner from './Components/CookieBanner'; // Import the CookieBanner

const App = () => {
  return (
    <Router>
      <div className="app">
        <CookieBanner /> {/* Add the CookieBanner component */}
        <Routes>
          <Route exact path="/" element={<AdminLogin />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Todo" element={<Todo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
