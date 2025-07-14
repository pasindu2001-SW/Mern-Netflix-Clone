import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase' // Importing the auth object from firebase.js
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user){
        console.log("Logged In successfully");
        navigate("/");
      }else {
        console.log("Logged Out");
        navigate("/login");
      }
  })
}, [])

  return (
    <div>
      <ToastContainer theme='dark '/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} /> {/* will display login page */}
        <Route path='/player/:id' element={<Player />} /> {/* will display player page */}
      </Routes>
    </div>
  )
}

export default App
