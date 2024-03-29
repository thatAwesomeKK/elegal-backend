import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = await User.findById(req.user._id).select("role pfp username");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    return res.status(200).json({ success: true, message: user });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Internal Server Error" });
  }
}
