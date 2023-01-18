const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

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
      minLength: [8, "Password must be at least 8 characters"]
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
   },
   passwordResetToken: String,
   passwordResetTokenExpiresIn: Date
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

userSchema.methods.generateTokenForPasswordReset = function(){
   // generate token and convert it into a string
   const token = crypto.randomBytes(32).toString("hex")

   //encrypt token and store it
   const hash = crypto.createHash("sha256")
   const encryptedTokenString = hash.update(token).digest().toString("hex")
   this.passwordResetToken = encryptedTokenString

   //Expire the token in 10 minutes
   this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000

   //sent the plain text token to the user's email
   return token
}

const User = mongoose.model("User", userSchema)
module.exports = User