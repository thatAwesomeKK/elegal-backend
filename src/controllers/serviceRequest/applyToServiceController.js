import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = req.user;
    const foundUser = await User.findOne({ _id: user._id });
    if (!foundUser) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    const { serviceId, price } = req.body;

    const foundService = await ServiceRequest.findOne({
      _id: serviceId,
      "PotentialProviders.uid": user._id,
    });

    if (foundService?.LegalProviderId) {
      return res
        .status(400)
        .json({ success: false, error: "Someone is Already Assigned" });
    }

    if (foundService) {
      return res.status(400).json({ success: false, error: "Already Applied" });
    } else {
      await ServiceRequest.findOneAndUpdate(
        { _id: serviceId },
        {
          $addToSet: {
            PotentialProviders: {
              uid: user._id,
              price,
            },
          },
        }
      );
    }

    return res
      .status(200)
      .json({ success: true, message: "Successfully Applied!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
