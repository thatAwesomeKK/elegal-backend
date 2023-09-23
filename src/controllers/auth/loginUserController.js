import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { getAccessToken } from "../../methods/jwtCreation.js";
import cookieConfig from "../../config/cookieConfig.js";

export default async function (req, res) {
  try {
    const { email, password } = req.body;

    //Checking if user with email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, error: "Wrong Credentials" });
    }

    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCompare) {
      return res
        .status(401)
        .json({ success: false, error: "Wrong Credentials" });
    }

    req.session.user = existingUser._id;

    res.send({ success: true, message: "Logged In Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
