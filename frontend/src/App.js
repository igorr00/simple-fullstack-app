import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomeAdmin from './HomeAdmin';
import HomeCustomer from './HomeCustomer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/homeCustomer" element={<HomeCustomer />} />
      </Routes>
    </Router>
  );
}

export default App;