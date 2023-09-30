import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const serviceId = req.query.serviceId;
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "No User Exists",
      });
    }

    const service = await ServiceRequest.findById({ _id: serviceId })
      .populate({
        path: "PotentialProviders.uid",
        model: User,
        select: "_id username pfp",
      })
      .select("PotentialProviders");

    return res.status(200).json({
      success: true,
      message: service.PotentialProviders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
