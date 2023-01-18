import React from 'react';
import './App.css';
import { Routes, Route, Navigate  } from 'react-router-dom';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';

//Pages
import Home from './pages/home/Home';
import WelcomePage from './pages/welcome/Welcome';
import PageNotFound from './pages/not-found/PageNotFound'
import ForgotPasswordPage from './pages/reset-password/ForgotPassword';
import ResetPasswordPage from './pages/reset-password/ResetPassword';

const App = () => {
  return (
    <main className='main-container'>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<SignUp/>}/>
          <Route path="sign-in" element={<SignIn/>}/>
        </Route>
        <Route path="/welcome" element={<WelcomePage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>
        <Route path="/not-found" element={<PageNotFound/>}/>

        <Route path="*" element={<Navigate to="/not-found"/>} />
      </Routes>
    </main>
  )
}

export default App;
