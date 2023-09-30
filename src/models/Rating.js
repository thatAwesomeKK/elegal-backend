import { Schema, model } from "mongoose";

export const ratingSchema = new Schema(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    serviceProviderId: {
      type: Schema.Types.ObjectId,
      ref: "serviceRequest",
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model("rating", ratingSchema);
