import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { getAccessToken } from "../../methods/jwtCreation.js";
import cookieConfig from "../../config/cookieConfig.js";

export default async function (req, res) {
  try {
    const { email, password } = req.body;

    //Checking if user with email exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ success: false, error: "Wrong Credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, foundUser.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success: false, error: "Wrong Credentials" });
    }

    const accessToken = getAccessToken({ id: foundUser._id });

    //setting refreshToken in Cookie
    res.cookie("accessToken", accessToken, cookieConfig);
    return res.status(200).json({
      success: true,
      message: "Logged In Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Internal Server Error" });
  }
}
