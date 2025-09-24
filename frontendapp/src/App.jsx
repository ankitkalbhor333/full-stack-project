import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components3
import Navbar from "./component/navbar/navbar.jsx";
import Footer from "./component/footer/footer.jsx";
import Loginpopup from "./component/LoginPopup/Loginpopup.jsx";

// Pages
import Home from "./pages/home/home.jsx";
import Cart from "./pages/cart/cart.jsx";
import Placeorder from "./pages/placeorder/placeorder.jsx";
import Exploremenu from "./component/exploremenu/Exploremenu.jsx";
import SearchFood from "./component/navbar/SearchFood.jsx";
import Profile from './pages/profile/Profile.jsx';
import ContactUs from "./component/contact/ContactUs.jsx";
import Appdowload from "./component/appdowload/Appdowload.jsx";
import Menuseparte from "./pages/Menuseparte.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import Myorder from "./pages/Myorder/Myorder.jsx";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Login Popup */}
      {showLogin && <Loginpopup setShowLogin={setShowLogin} />}

      <div className="app">
        {/* Navbar */}
        <Navbar setShowLogin={setShowLogin} />

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorders" element={<Myorder/>} />
         
          <Route path="/searchfood" element={<SearchFood />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/appdowload" element={<Appdowload />} />
          <Route path="/menu" element={<Menuseparte/>} />
          
        </Routes>
         <Footer/>
       
      </div>
    </>
  );
};

export default App;
