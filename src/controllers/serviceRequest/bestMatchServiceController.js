import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = req.user;

    const services = await User.findById({ _id: user._id }).select("matchRequests").populate({
      path: "matchRequests",
      model: ServiceRequest,
    });

    return res.status(200).json({
      success: true,
      message: services.matchRequests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
