import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const {
      state,
      city,
      mobile_no,
      description,
      case_type,
      serviceType,
      price,
    } = req.body;
    const user = req.user;

    let newService = {
      creatorId: user._id,
      state,
      city,
      mobile_no,
      description,
      type: serviceType,
    };

    if (case_type) newService.caseType = case_type;
    if (price) newService.price = price;

    const service = await new ServiceRequest(newService).save();

    await User.updateMany(
      {
        specialization: service.caseType,
        state: service.state,
        city: service.city,
      },
      { $addToSet: { matchRequests: service._id } }
    );

    return res.status(200).json({
      success: true,
      message: "Successfully Created Service Request!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
