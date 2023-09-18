import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export default async function (req, res) {
  try {
    const foundUser = await User.findById({ _id: req.verify.id });
    if (!foundUser) {
      return res.status(400).json({ success: false, error: "User Not Found!" });
    }

    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(
      { _id: foundUser._id },
      {
        password: secPass,
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "Password Changed SuccessFully!" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Internal Server Error" });
  }
}
