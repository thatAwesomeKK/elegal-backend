import Feedback from "../../models/Feedback.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = req.user;

    const foundUser = await User.findById({ _id: user._id });
    if (!foundUser)
      return res.status(404).json({ success: false, error: "User not found" });

    const { description, serviceId } = req.body;

    const feedback = new Feedback({
      description,
      uid: user._id,
      serviceId,
    });

    await feedback.save();

    return res.status(200).json({
      success: true,
      message: "Feedback saved successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
