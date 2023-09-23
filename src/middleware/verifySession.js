import User from "../models/User.js";

export default async function (req, res, next) {
  try {
    const {user: userId} = req.session
    console.log(userId);
    if (!userId) {
      return res.status(401).json({ success: false, error: "Not Authorized" });
    }
    const existingUser = await User.findOne({ _id: userId });
    req.user = existingUser
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token Invalid" });
  }
  next();
}
