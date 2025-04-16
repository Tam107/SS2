import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

export const sendMail =async (options)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE, // true for port 465, false for other ports
        auth: {
          user: process.env.SMPT_MAIL,
          pass:process.env.SMPT_PASSWORD,
        },
      });

    const mailOptions = {
        from: process.env.SMPT_MAIL, 
        to: options.email, // list of receivers
        subject:options.subject, // Subject line
        text:options.text, // plain text body
      
    };

    await transporter.sendMail(mailOptions)
      
}
