import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import Footer from './components/pages/Footer';
import Slider from './components/ImageSliders/slider';
import Products from './components/ProductList/Products';
import ProductListing from './components/ProductListing/ProductListing';



function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="" element={<> <Header /><Home /><Footer /></>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/slider" element={<Slider/>} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/productListing" element={<><Header /><ProductListing/><Footer /></>} />
        <Route exact path="/reset-password/:userId/:resetToken/" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
