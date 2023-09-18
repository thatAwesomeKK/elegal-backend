import { transporter } from "../../config/nodemailer.js";
import { verifyForgotPasswordGenerate } from "../../methods/generateEmail.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ success: false, error: "User Not Found!" });
    }
    console.log(foundUser);
    const HTML = verifyForgotPasswordGenerate(foundUser._id);
    const emailMessage = {
      from: process.env.CLIENT_USER_EMAIL,
      to: email,
      subject: "Forgot Password",
      html: HTML,
    };
    await transporter.sendMail(emailMessage);

    return res.status(200).json({ success: true, message: "Check Your Email!" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Internal Server Error" });
  }
}
