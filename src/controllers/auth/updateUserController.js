// import cloudinary from "../../config/cloudinary.js";
import User from "../../models/User.js";

export default async function (req, res) {
  try {
    const {
      username,
      first_name,
      middle_name,
      sur_name,
      state,
      city,
      role,
      specialization,
      type,
    } = req.body;
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }
    let updUser = {};
    // if (pfp) {
    //     const response = await cloudinary.uploader.upload(pfp, {
    //        upload_preset: "pfp",
    //      });
    //      updUser.pfp = response.secure_url;
    // }
    if (username !== user.username) {
      updUser.username = username;
    }
    if (first_name !== user.firstName) {
      updUser.firstName = first_name;
    }
    if (middle_name !== user.middleName) {
      updUser.middleName = middle_name;
    }
    if (sur_name !== user.surName) {
      updUser.surName = sur_name;
    }
    if (state !== user.state) {
      updUser.state = state;
    }
    if (city !== user.city) {
      updUser.city = city;
    }
    if (role !== user.role) {
      updUser.role = role;
    }
    if (specialization !== user.specialization) {
      updUser.specialization = specialization;
    }
    if (type !== user.type) {
      updUser.type = type;
    }

    await User.findByIdAndUpdate({ _id: user._id }, updUser);

    return res
      .status(200)
      .json({ success: true, message: "User Updated SuccessFully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error!" });
  }
}
