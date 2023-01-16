import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import './Home.css';

const Home = () => {

   const location = useLocation()

   return (
      <section className="home-container">
         
         <div className="content-container">
            <header className="content-header">
               <Link to="/" className="link logo">User Auth</Link>

               {
                  location.pathname === "/sign-in" 
                  ? (
                        <p>Don't have an account? <Link className="link" to="/">Sign Up</Link></p> 
                     )
                  : (
                     <p>Already have an account? <Link className="link" to="/sign-in">Sign In</Link></p>
                  )
               }
               
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