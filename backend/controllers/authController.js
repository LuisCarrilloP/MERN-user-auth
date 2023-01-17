const User = require("../models/userModel")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/appError")



const generateToken = (userId) => {
   const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })

   return token
}

exports.signup = asyncErrorHandler(async(req, res, next) => {
   const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
   })

   const token = generateToken(newUser._id)

   res.status(200).json({
      status: "success",
      data: {
         user: newUser,
         token
      }
   })
})

exports.login = asyncErrorHandler(async(req, res, next) => {
   const { email, password } = req.body

   //Check email and password entered
   if(!email || !password){
      return next(new AppError("Email and password are required!"), 400)
   }

   //Check user exists && Ckeck password correct
   const user = await User.findOne({ email })

   if(!user || !await user.comparePassword(password)){
      return next(new AppError("Invalid credentials!", 400))
   }

   //Generate token, send it to the client
   const token = generateToken(user._id)
   
   res.status(200).json({
      status: "success",
      data: {
         user,
         token: token
      }
   })
})