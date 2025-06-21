import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomeAdmin from './HomeAdmin';
import HomeCustomer from './HomeCustomer';
import ActiveProducts from './ActiveProducts';
import Analytics from './Analytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/homeCustomer" element={<HomeCustomer />} />
        <Route path="/activeProducts" element={<ActiveProducts /> } />
        <Route path='/analytics' element={<Analytics /> } />
      </Routes>
    </Router>
  );
}

export default App;