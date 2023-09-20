import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = req.user;
    const { life } = req.query;
    const { serviceId, serviceProviderId, price } = req.body;

    const foundUser = await User.findById({ _id: user.id });
    if (!foundUser) {
      if (!foundService)
        return res.status(400).json({
          success: false,
          error: "No User Found",
        });
    }

    const foundService = await ServiceRequest.findOne({ _id: serviceId });
    if (!foundService)
      return res.status(400).json({
        success: false,
        error: "No service found",
      });

    if (life === "assigned" && foundService.life === "created") {
      await ServiceRequest.findByIdAndUpdate(serviceId, {
        LegalProviderId: serviceProviderId,
        price,
      });
      await User.findByIdAndUpdate(serviceProviderId, {
        $pull: {
          matchRequests: foundService._id,
        },
      });

      await ServiceRequest.findByIdAndUpdate(serviceId, {
        $set: { PotentialProviders: [] },
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
      error: "Internal Server Error",
    });
  }
}
