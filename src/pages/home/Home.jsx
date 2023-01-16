import React from "react";
import { Outlet } from "react-router-dom";
import SignIn from "../../components/sign-in/SignIn";
import SignUp from "../../components/sign-up/SignUp";
import './Home.css';

const Home = () => {
   return (
      <section className="home-container">
         
         <div className="content-container">
            <header className="content-header">
               <div className="logo">CodeBrew</div>
               <p>Already have an account? <span>Sign In</span></p>
            </header>
            <div className="outlet-container">
               <Outlet />
            </div>
         </div>

         <div className="image-container">
         </div>

      </section>
   )
}

export default Home