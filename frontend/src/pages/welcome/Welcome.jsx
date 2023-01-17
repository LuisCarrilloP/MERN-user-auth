import React from "react";
import './Welcome.css';

//Redux
import { useSelector } from "react-redux";

const WelcomePage = () => {

   const { user } = useSelector((state) => state.auth)

   const username = user ? user.data.user.name : null

   return (
      <section className="welcome-container">
         <h1 className="welcome-header">
            Welcome <span>{username}!</span>
         </h1>
         <button className="logout-button">Log Out</button>
      </section>
   )
}

export default WelcomePage;