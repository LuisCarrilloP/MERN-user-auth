const User = require("../models/userModel")
const asyncErrorHandler = require("../utils/asyncErrorHandler")

exports.signup = asyncErrorHandler(async(req, res, next) => {
   const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
   })

   res.status(200).json({
      status: "success",
      data: {
         user: newUser
      }
   })
})