import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = req.user;
    const { life } = req.query;
    const { serviceId, price } = req.body;

    const foundService = await ServiceRequest.findOne({ _id: serviceId });
    if (!foundService)
      return res.status(400).json({
        success: false,
        message: "No service found",
      });

    if (life === "assigned" && foundService.life === "created") {
      await ServiceRequest.findByIdAndUpdate(serviceId, {
        LegalProviderId: user._id,
        price
      });
      
      await User.findByIdAndUpdate(user._id, {
        $pull: {
          matchRequests: foundService._id,
        },
      });
    }

    await ServiceRequest.findByIdAndUpdate(serviceId, { life });
    return res.status(200).json({
      success: true,
      message: "Successfully updated!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
