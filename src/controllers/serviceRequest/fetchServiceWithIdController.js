import ServiceRequest from "../../models/ServiceRequest.js";

export default async function (req, res) {
  try {
    const serviceId = req.query.serviceId;

    const service = await ServiceRequest.findById({ _id: serviceId }).populate({
      path: "LegalProviderId",
      model: "user",
      select: 'username pfp'
    });;

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
