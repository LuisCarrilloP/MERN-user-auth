const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Name is required"]
   },
   email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email!"]
   },
   password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: 8
   },
   confirmPassword: {
      type: String,
      required: [true, "Please confirm your password!"],
      //this runs only save() or create()
      validate: {
         validator: function(el){
            return el === this.password
         },
         message: "Passwords don't match"
      }
   }
})

//only when password is modified
userSchema.pre("save", async function(next){
   if(!this.isModified("password")){
      return next()
   }

   this.password = await bcrypt.hash(this.password, 12)
   this.confirmPassword = undefined
   
   next()
})

userSchema.methods.comparePassword = async function(passwordEntered){
   return await bcrypt.compare(passwordEntered, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User