import cookieConfig from "../../config/cookieConfig.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      res.clearCookie("accessToken", cookieConfig);
      return res.status(200).json({ success: false, error: "User does not Exists!" });
    }
    res.clearCookie("accessToken", cookieConfig);
    return res
      .status(200)
      .json({ success: true, message: "Logged Out SuccessFully!" });
  } catch (error) {
    res.clearCookie("accessToken", cookieConfig);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
