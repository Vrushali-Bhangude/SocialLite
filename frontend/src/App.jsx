import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Signup from './views/signup.jsx'
import Signin from './views/Signin.jsx'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
       <Toaster position="top-right" reverseOrder={false} />
    </div>
  ) 
}

export default App