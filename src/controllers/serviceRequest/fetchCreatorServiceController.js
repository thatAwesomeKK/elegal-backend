import Feedback from "../../models/Feedback.js";
import Rating from "../../models/Rating.js";
import ServiceRequest from "../../models/ServiceRequest.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = req.user;
    let serviceCount = 0;
    let services = [];

    //Getting Query Params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 6;

    //Setting Starting and Ending Index
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results = {};

    if (user.role === "buyer")
      serviceCount = await ServiceRequest.find({ creatorId: user._id })
        .populate({
          path: "LegalProviderId",
          model: User,
          select: "username pfp",
        })
        .countDocuments();

    if (user.role === "service-provider")
      serviceCount = await ServiceRequest.find({
        LegalProviderId: user._id,
      })
        .populate({
          path: "LegalProviderId",
          model: User,
          select: "username pfp",
        })
        .countDocuments();

    //Setting If next page exists
    if (endIndex < serviceCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    //Setting If previous page exists
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    if (user.role === "buyer")
      services = await ServiceRequest.find({ creatorId: user._id })
        .populate({
          path: "LegalProviderId",
          model: User,
          select: "username pfp",
        })
        .limit(limit)
        .skip(startIndex);

    if (user.role === "service-provider")
      services = await ServiceRequest.find({
        LegalProviderId: user._id,
      })
        .populate({
          path: "LegalProviderId",
          model: User,
          select: "username pfp",
        })
        .limit(limit)
        .skip(startIndex);

    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      const foundFeedback = await Feedback.find({
        serviceId: service._id,
        uid: user._id,
      });

      if (service.life === "received") {
        const foundRating = await Rating.findOne({
          buyerId: user._id,
          serviceProviderId: service.LegalProviderId._id,
        });
        service._doc.rating = foundRating ? true : false;
      } else {
        service._doc.rating = false;
      }

      service._doc.feedback = foundFeedback.length > 0 ? true : false;
    }

    results.orders = services;

    return res.status(200).json({
      success: true,
      message: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
