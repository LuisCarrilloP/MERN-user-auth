import React, { useState } from 'react';



const defaultFormFields = {
   name: "",
   email: "",
   password: "",
   confirmPassword: ""
}

const SignUp = () => {

   const [formFields, setFormFields] = useState(defaultFormFields)

   const handleInputValueChange = (event) => {
      const { name, value } = event.target
      setFormFields({ ...formFields, [name]: value })
   }
   const handleSubmit = (event) => {
      event.preventDefault()
   }

   return (
      <section className='form-container'>
         <h1 className='form-heading'>Create an account</h1>
         
         <form onSubmit={handleSubmit}>
            <div className="form-item" id="name">
               <label htmlFor="">Name</label>
               <input type="text" placeholder='Enter your name' name='name' value={formFields.name} onChange={handleInputValueChange}/>
            </div>

            <div className="form-item" id="email">
               <label htmlFor="">Email</label>
               <input type="text" placeholder='Enter your email' name='email' value={formFields.email}  onChange={handleInputValueChange}/>
            </div>

            <div className="form-item" id="password">
               <label htmlFor="">Password</label>
               <input type="password" placeholder='Enter your password' name='password' value={formFields.password} onChange={handleInputValueChange}/>
            </div>

            <div className="form-item" id="confirmPassword">
               <label htmlFor="">Confirm Password</label>
               <input type="password" placeholder='Enter your password again' name='confirmPassword' value={formFields.confirmPassword} onChange={handleInputValueChange}/>
            </div>

            <button className='form-button' type='submit'>Sign Up</button>
         </form>

      </section>
   );
};

export default SignUp;