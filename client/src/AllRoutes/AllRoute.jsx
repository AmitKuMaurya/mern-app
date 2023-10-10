import React from 'react'
import {Route, Routes} from "react-router-dom";
import LoginPage from '../pages/login/LoginPage';
import SignupPage from '../pages/signup/SignupPage';

const AllRoute = () => {
  return (
    <>
        <Routes>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<SignupPage/>} />
        </Routes>
    </>
  )
}

export default AllRoute;