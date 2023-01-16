const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Name is required"]
   },
   email: {
      type: String,
      required: [true, "Email is requires"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"]
   },
   password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: 8
   },
   confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"]
   }
})

const User = mongoose.model("User", userSchema)
module.exports = User