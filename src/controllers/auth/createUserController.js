import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { verifyEmailGenerate } from "../../methods/generateEmail.js";
import { transporter } from "../../config/nodemailer.js";

export default async function (req, res) {
  try {
    const { username, email, password, role, type, specialization, licenseId } =
      req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "A User with this Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const avatarUrl = `https://avatars.dicebear.com/api/adventurer-neutral/${username}.svg`;

    let newUser = {
      username,
      email,
      pfp: avatarUrl,
      password: secPass,
      role,
    };

    if (type) newUser.type = type;
    if (specialization) newUser.specialization = specialization;
    if (licenseId) newUser.licenseId = licenseId;


    const createdUser = await new User(newUser).save();
    
    const HTML = verifyEmailGenerate(createdUser._id);
    const emailMessage = {
      from: process.env.CLIENT_USER_EMAIL,
      to: email,
      subject: "Verify EMAIL",
      html: HTML,
    };
    await transporter.sendMail(emailMessage);
    // const data = await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: "2550492.kk@gmail.com" ,
    //   subject: "Confirm Email",
    //   html: HTML,
    // });

    // console.log(data);

    return res
      .status(200)
      .json({ success: true, message: "Confirm Email Address!" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Internal Server Error" });
  }
}
