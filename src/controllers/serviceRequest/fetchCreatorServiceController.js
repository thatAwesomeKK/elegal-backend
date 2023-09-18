import ServiceRequest from "../../models/ServiceRequest.js";

export default async function (req, res) {
  try {
    const user = req.user;
    let service;

    if (user.role === "buyer")
      service = await ServiceRequest.find({ creatorId: user._id }).populate({
        path: "LegalProviderId",
        model: "user",
        select: "username pfp",
      });

    if (user.role === "service-provider")
      service = await ServiceRequest.find({
        LegalProviderId: user._id,
      }).populate({
        path: "LegalProviderId",
        model: "user",
        select: "username pfp",
      });

    return res.status(200).json({
      success: true,
      message: service,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
