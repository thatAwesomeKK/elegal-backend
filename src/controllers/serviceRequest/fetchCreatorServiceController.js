import Feedback from "../../models/Feedback.js";
import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = req.user;
    let services = [];

    if (user.role === "buyer")
      services = await ServiceRequest.find({ creatorId: user._id }).populate({
        path: "LegalProviderId",
        model: User,
        select: "username pfp",
      });

    if (user.role === "service-provider")
      services = await ServiceRequest.find({
        LegalProviderId: user._id,
      }).populate({
        path: "LegalProviderId",
        model: User,
        select: "username pfp",
      }); 

    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      const foundFeedback = await Feedback.find({
        serviceId: service._id,
        uid: user._id,
      });
      service._doc.feedback = foundFeedback.length > 0 ? true : false;
    }

    return res.status(200).json({
      success: true,
      message: services,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
