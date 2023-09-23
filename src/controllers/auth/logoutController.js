import cookieConfig from "../../config/cookieConfig.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, error: "User does not Exists!" });
    }

    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      }
    });
    
    res.clearCookie("sid", { ...cookieConfig, maxAge: 1000 * 60 * 30 });
    return res
      .status(200)
      .json({ success: true, message: "Logged Out SuccessFully!" });
  } catch (error) {
    res.clearCookie("sid", { ...cookieConfig, maxAge: 1000 * 60 * 30 });
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
