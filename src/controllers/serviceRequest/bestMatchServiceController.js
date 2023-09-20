import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = req.user;

    let services;

    if (user.type === "advocate") {
      services = await ServiceRequest.find({
        state: user.state,
        city: user.city,
        type: user.type,
        caseType: user.specialization,
      });
    } else {
      services = await ServiceRequest.find({
        state: user.state,
        city: user.city,
        type: user.type,
      });
    }

    return res.status(200).json({
      success: true,
      message: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
