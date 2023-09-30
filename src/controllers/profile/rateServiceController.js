import Rating from "../../models/Rating.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const user = req.user;
    const { serviceProviderId, rating, description } = req.body;
    const existingProvider = await User.findById(serviceProviderId);
    if (!existingProvider) {
      return res
        .status(401)
        .json({ success: false, error: "No Service Provider Found" });
    }

    const ratingExists = await Rating.findOne({
      buyerId: user._id,
      serviceProviderId,
    });
    if (ratingExists) {
      return res
        .status(401)
        .json({ success: false, error: "Rating Already Exists!" });
    }

    let newRating = {
      buyerId: user._id,
      serviceProviderId: existingProvider._id,
      rating: parseFloat(rating),
    };

    if (description) {
      newRating.description = description;
    }

    const createdRating = await new Rating(newRating).save();
    let calculatedRating;

    if (!existingProvider.rating) {
      calculatedRating = createdRating.rating;
    } else {
      calculatedRating = (existingProvider.rating + createdRating.rating) / 2;
    }

    await User.findByIdAndUpdate(existingProvider._id, {
      rating: calculatedRating,
      $addToSet: {
        ratings: createdRating._id,
      },
    });

    return res.status(200).json({ success: true, message: "Rating Done!" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "Internal Server Error" });
  }
}
