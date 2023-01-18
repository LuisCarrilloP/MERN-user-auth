import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../../features/auth/authSlice';
import { loginUser } from '../../features/auth/authActions';

const defaultFormFields = {
   email: "",
   password: "",
}

const SignIn = () => {

   const [formFields, setFormFields] = useState(defaultFormFields)
   const [formErrrors, setFormErrrors] = useState({})

   const { user, error, success, message } = useSelector((state) => state.auth)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      if(error){
         handleError(message)
      }

      if(success && user){
         navigate("/welcome")
      }

      return() => {
         dispatch(reset())
      }
   }, [error, message, user, success, navigate, dispatch])

   const handleInputValueChange = (event) => {
      const { name, value } = event.target
      setFormFields({ ...formFields, [name]: value })
   }
   const changeBorderColorOnError = (inputName) => {
      let formInput = document.getElementById(`${inputName}`)
      formInput.classList.add("error")
   }
   const handleError = (message) => {
      //Parse the error message string
      const messageObject = JSON.parse(message)
      
      Object.keys(messageObject).forEach((item) => {
         changeBorderColorOnError(item)
      })

      setFormErrrors(messageObject)

   }
   // const handleValidation = () => {
   //    let error = {}

   //    if(!formFields.email){
   //       error.email = "Email is required!"
   //       changeBorderColorOnError("email")
   //    }

   //    if(!formFields.password){
   //       error.password = "Password is required"
   //       changeBorderColorOnError("password")
   //    }

   //    return error
   // }


   const handleSubmit = (event) => {
      event.preventDefault()
      //console.log(formFields)
      // setFormErrrors(handleValidation())
      dispatch(loginUser(formFields))
   }

   return (
      <section className='form-container'>
         <h1 className='form-heading'>Sign In</h1>
         
         <form onSubmit={handleSubmit}>

            <div className="form-item" id="email">
               <label htmlFor="">Email</label>
               <input 
                  type="text" 
                  placeholder='Enter your email' 
                  name='email' 
                  value={formFields.email}  
                  onChange={handleInputValueChange}
               />
               <span className="error-text">{formErrrors.email}</span>
            </div>

            <div className="form-item" id="password">
               <label htmlFor="">Password</label>
               <input 
                  type="password" 
                  placeholder='Enter your password' 
                  name='password' 
                  value={formFields.password} 
                  onChange={handleInputValueChange}
               />
               <span className="error-text">{formErrrors.password}</span>
            </div>

            <button className='form-button' type='submit'>Sign In</button>

            <Link className="forgot-link" to="/forgot-password">Forgot your password?</Link>
         </form>

      </section>
   );
};

export default SignIn;