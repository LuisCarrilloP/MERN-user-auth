import React, { useState } from 'react';



const defaultFormFields = {
   name: "",
   email: "",
   password: "",
   confirmPassword: ""
}

const SignUp = () => {

   const [formFields, setFormFields] = useState(defaultFormFields)
   const [formErrors, setFormErrors] = useState({})

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

      if(!formFields.name){
         error.name = "Name is required!"
         changeBorderColorOnError("name")
      }

      if(!formFields.email){
         error.email = "Email is required!"
         changeBorderColorOnError("email")
      }

      if(!formFields.password){
         error.password = "Password is required"
         changeBorderColorOnError("password")
      }

      if(!formFields.confirmPassword){
         error.confirmPassword = "Confirm your password!"
         changeBorderColorOnError("confirmPassword")
      }

      return error
   }
   const handleSubmit = (event) => {
      event.preventDefault()
      setFormErrors(handleValidation)
   }

   return (
      <section className='form-container'>
         <h1 className='form-heading'>Create an account</h1>
         
         <form onSubmit={handleSubmit}>
            <div className="form-item" id="name">
               <label htmlFor="">Name</label>
               <input 
                  type="text" 
                  placeholder='Enter your name' 
                  name='name' 
                  value={formFields.name} 
                  onChange={handleInputValueChange}
               />
               <span className="error-text">{formErrors.name}</span>
            </div>

            <div className="form-item" id="email">
               <label htmlFor="">Email</label>
               <input 
                  type="text" 
                  placeholder='Enter your email' 
                  name='email' 
                  value={formFields.email}  
                  onChange={handleInputValueChange}
               />
               <span className="error-text">{formErrors.email}</span>
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
               <span className="error-text">{formErrors.password}</span>
            </div>

            <div className="form-item" id="confirmPassword">
               <label htmlFor="">Confirm Password</label>
               <input 
                  type="password" 
                  placeholder='Enter your password again' 
                  name='confirmPassword' 
                  value={formFields.confirmPassword} 
                  onChange={handleInputValueChange}
               />
               <span className="error-text">{formErrors.confirmPassword}</span>
            </div>

            <button className='form-button' type='submit'>Sign Up</button>
         </form>

      </section>
   );
};

export default SignUp;