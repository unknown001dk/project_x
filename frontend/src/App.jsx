import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './utils/NotFound';
import Register from './pages/users/Register';
import Login from './pages/users/Login';
import Home from './pages/Home';
import Profile from './pages/users/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-center"
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App