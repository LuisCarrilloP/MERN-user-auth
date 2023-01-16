import React, { useState } from 'react';



const defaultFormFields = {
   email: "",
   password: "",
}

const SignIn = () => {

   const [formFields, setFormFields] = useState(defaultFormFields)
   const [formErrrors, setFormErrrors] = useState({})

   const handleInputValueChange = (event) => {
      const { name, value } = event.target
      setFormFields({ ...formFields, [name]: value })
   }
   const changeBorderColorOnError = (inputName) => {
      let formInput = document.getElementById(`${inputName}`)
      formInput.classList.add("error")
   }
   const handleValidation = () => {
      let error = {}

      if(!formFields.email){
         error.email = "Email is required!"
         changeBorderColorOnError("email")
      }

      if(!formFields.password){
         error.password = "Password is required"
         changeBorderColorOnError("password")
      }

      return error
   }


   const handleSubmit = (event) => {
      event.preventDefault()
      //console.log(formFields)
      setFormErrrors(handleValidation)
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
         </form>

      </section>
   );
};

export default SignIn;