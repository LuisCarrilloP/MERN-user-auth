const nodemailer = require("nodemailer")
const pug = require("pug")

class Email {
   constructor(user, url){
      this.to = user.email
      this.from = '"Luis Carrillo👻" <admin@example.com>'
      this.url = url
      this.name = user.name
   }
   createTransporter(){
      if(process.env.NODE_ENV === "development"){
         let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, //true for 465, false for other ports
            auth: {
               user: process.env.EMAIL_USERNAME,
               pass: process.env.EMAIL_PASSWORD
            }
         })
         return transporter
      }
      if(process.env.NODE_ENV === "production"){
         let transporter = nodemailer.createTransport({
            service: "SendinBlue",
            auth: {
               user: process.env.SENDINBLUE_USERNAME,
               pass: process.env.SENDINBLUE_PASSWORD
            }
         });
         return transporter
      }
   }
   //function to send the email to reset password
   async sendEmailToResetPassword(template, emailOptions){
      //Render html based on the template provided
         //set path to the tempalte file
      const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
         url: this.url,
         text: emailOptions.text,
         name: this.name
      })
      //Send email options
      let mailOptions = {
         from: this.from,
         to: this.to,
         subject: emailOptions.subject,
         html: html
      }
      //Create a trasnsport for sending email and also chain the sendMail function
      await this.createTransporter().sendMail(mailOptions)
   }
}


module.exports = Email