import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header';
import Top_section from './components/Top_section';
import Coupon from "./components/Coupon";
import OMG_Deals from "./components/OMG_Deals";
import Category from "./components/Category";
import ProductList from './components/ProductList';
import Knockout_Offers from "./components/Knockout_Offers";
import Footer from "./components/footer";
import Login from "./components/Login";

import SignUp from "./components/SignUp";


const HomePage = () => (
  <>
    <Header />
    <Top_section />
    <Coupon />
    <OMG_Deals />
    <Category />
    <ProductList />
    <ProductList />
    <Knockout_Offers />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;
