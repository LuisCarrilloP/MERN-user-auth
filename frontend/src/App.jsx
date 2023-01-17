import React from 'react';
import './App.css';
import { Routes, Route  } from 'react-router-dom';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';

//Pages
import Home from './pages/home/Home';
import WelcomePage from './pages/welcome/Welcome';

const App = () => {
  return (
    <main className='main-container'>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<SignUp/>}/>
          <Route path="sign-in" element={<SignIn/>}/>
        </Route>
        <Route path="/welcome" element={<WelcomePage/>}/>
      </Routes>
    </main>
  )
}

export default App;
