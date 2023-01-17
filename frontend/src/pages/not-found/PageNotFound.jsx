import React from 'react';
import './page-not-found.css'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
   return (
      <section className="not-found-container">
         <h1 className='not-found-heading'>Sorry. couldn't find this page.</h1>
         <p className='not-found-text'>
            If logged in go to <Link to="/welcome" className='link'>Home</Link>. Else <Link to="/sign-in" className='link'>Log In</Link>
         </p>
      </section>
   )
}

export default PageNotFound