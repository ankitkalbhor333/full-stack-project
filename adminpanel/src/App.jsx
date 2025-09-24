import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Add from './pages/add/Add.jsx'
import List from './pages/list/List'
import Order from './pages/order/order'
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const url = "https://food-dev-backend-5umy.onrender.com";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">   {/* ✅ fixed className */}
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
