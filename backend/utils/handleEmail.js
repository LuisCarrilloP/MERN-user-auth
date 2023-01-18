const nodemailer = require("nodemailer")

const sendEmailToResetPassword = async (options) => {
   //Create a transporter to send the email
   let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: "cd0805ea6d605f",
         pass: "6380b85593236d"
      }
   });

   //Set up the email options and send it
   let info = await transporter.sendMail({
      from: '"Luis Carrillo👻" <admin@example.com>', // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      text: options.text, // plain text body
   });
}

module.exports = sendEmailToResetPassword