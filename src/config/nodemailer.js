import { createTransport } from "nodemailer";

export const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.CLIENT_USER_EMAIL, // generated ethereal user
    pass: process.env.CLIENT_USER_PASSWORD, // generated ethereal password
  },
});