import ServiceRequest from "../../models/ServiceRequest.js";

export default async function (req, res) {
  try {
    const user = req.user;

    if (user.role !== "service-provider")
      return res.status(400).json({
        success: false,
        error: "Unauthorized!",
      });
      
    const service = await ServiceRequest.find({ life: "created" });

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
