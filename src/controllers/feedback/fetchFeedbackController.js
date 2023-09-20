import Feedback from "../../models/Feedback.js";

export default async function (req, res) {
  try {
    const feedbacks = await Feedback.find().populate({
      path: "uid",
      model: "user",
      select: "username pfp type role",
    });

    return res.status(200).json({
      success: true,
      message: feedbacks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
