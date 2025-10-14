import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

//views
import Signup from './views/signup.jsx'
import Signin from './views/Signin.jsx'
import Forgot from './views/Forgot.jsx';
import Profile from './views/Profile.jsx';
import Home from './views/Home.jsx';
import toast from 'react-hot-toast';


import { useSelector } from 'react-redux';
import getCurrentUser from './hooks/getCurrentUser.jsx';
import getsuggestedUsers from './hooks/getSuggestedUser.jsx';

const App = () => {
   getCurrentUser();
   getsuggestedUsers();
  const {userData} = useSelector((state)=>state.user)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={!userData ?<Signup/>:<Navigate to='/'/>}/>
          <Route path='/signin' element={!userData ?<Signin/>:<Navigate to='/'/>}/>
          <Route path='/' element={userData ?<Home/>:<Navigate to='/signin'/>}/>
          <Route path='/profile/:userName' element={userData ?<Profile/>:<Navigate to='/signin'/>}/>
          <Route path='/forgot-password' element={!userData ?<Forgot/>:<Navigate to='/'/>}/>
        </Routes>
      </BrowserRouter>
       <Toaster position="top-right" reverseOrder={false} />
    </div>
  ) 
}

export default App