import React, { useState } from 'react';



const defaultFormFields = {
   email: "",
   password: "",
}

const SignIn = () => {

   const [formFields, setFormFields] = useState(defaultFormFields)

   const handleInputValueChange = (event) => {
      const { name, value } = event.target
      setFormFields({ ...formFields, [name]: value })
   }
   const handleSubmit = (event) => {
      event.preventDefault()
      console.log(formFields)
   }

   return (
      <section className='form-container'>
         <h1 className='form-heading'>Sign In</h1>
         
         <form onSubmit={handleSubmit}>

            <div className="form-item" id="email">
               <label htmlFor="">Email</label>
               <input type="text" placeholder='Enter your email' name='email' value={formFields.email}  onChange={handleInputValueChange}/>
            </div>

            <div className="form-item" id="password">
               <label htmlFor="">Password</label>
               <input type="password" placeholder='Enter your password' name='password' value={formFields.password} onChange={handleInputValueChange}/>
            </div>

            <button className='form-button' type='submit'>Sign Up</button>
         </form>

      </section>
   );
};

export default SignIn;