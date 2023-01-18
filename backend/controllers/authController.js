const User = require("../models/userModel")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/appError")
const Email = require("../utils/handleEmail")
const crypto = require("crypto")


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

   const user = {
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id
   }

   res.status(200).json({
      status: "success",
      data: {
         user: user,
         token
      }
   })
})

exports.login = asyncErrorHandler(async(req, res, next) => {
   const { email, password } = req.body

   //Check email and password entered
   // if(!email || !password){
   //    return next(new AppError("Email and password are required!"), 400)
   // }
   if(!email || !password){
      let message = {}

      if(!email){
         message.email = "Email is required!"
      }

      if(!password){
         message.password = "Password is required"
      }

      return next(new AppError(JSON.stringify(message)), 400)
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

//receives email user provides from frontend

exports.forgotPassword = asyncErrorHandler(async(req, res, next) => {
   //Get the user based on the email whether exists or not
   const user = await User.findOne({ email: req.body.email })

   if(!user){
      return next(new AppError("There is not user with this email address", 404))
   }

   //Generate token for password reset
   const resetToken = user.generateTokenForPasswordReset()
   await user.save({validateBeforeSave: false})

   //Send the text token to the email
   // const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`

   const text = `Forgot password? Submit a new password and confirm password by clicking the button below`
   const url = `http://localhost:3000`

   try {
      await new Email(user, url).sendEmailToResetPassword("emailTemplate", {
         subject: "This passwor reset link is valid for 10 minutes",
         text: text
      })

      res.status(200).json({
         status: "success",
         message: "Reset token has been sent to the email provided"
      })

   } catch (err) {
      console.log(err)
      user.passwordResetToken = undefined
      user.passwordResetTokenExpiresIn = undefined
      await user.save({ validateBeforeSave: false })

      return next(new AppError("Error sending email", 500))
   }
})

//receive token and updated password from the user

exports.resetPassword = asyncErrorHandler(async(req, res, next) => {
   //Encrypt token received and compare it with the db one
   const hash = crypto.createHash("sha256")
   const encryptedTokenString = hash.update(req.params.resettoken).digest().toString("hex")
   
   //Get user based on the token
   const user = await User.findOne({
      passwordResetToken: encryptedTokenString,
      passwordResetTokenExpiresIn: { $gt: Date.now()}
   })

   //token valid and user exists uptadte password
   if(!user){
      return next(new AppError("Token has expired", 400))
   }

   user.password = req.body.password
   user.confirmPassword = req.body.confirmPassword
   user.passwordResetToken = undefined
   user.passwordResetTokenExpiresIn = undefined
   await user.save()

   //Login the user
   const token = generateToken(user._id)
   const userWithModifiedPassword = {
      name: user.name,
      email: user.email,
   }

   res.status(200).json({
      status: "success",
      data: {
         user: userWithModifiedPassword,
         token: token
      }
   })

})