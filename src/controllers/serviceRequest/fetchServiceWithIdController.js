import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const serviceId = req.query.serviceId;
    const user = req.user;

    let service;

    const foundService = await ServiceRequest.findById({ _id: serviceId });

    if (user.role === "buyer" && !foundService.LegalProviderId) {
      service = await ServiceRequest.findById({ _id: serviceId })
        .populate({
          path: "LegalProviderId",
          model: User,
          select: "username pfp",
        })
        .populate({
          path: "PotentialProviders.uid",
          model: User,
          select: "_id username pfp",
        });
    } else {
      service = await ServiceRequest.findById({ _id: serviceId })
        .populate({
          path: "LegalProviderId",
          model: User,
          select: "username pfp",
        })
        .populate({
          path: "PotentialProviders.uid",
          model: User,
          select: "_id username pfp",
        });
    }

    return res.status(200).json({
      success: true,
      message: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
