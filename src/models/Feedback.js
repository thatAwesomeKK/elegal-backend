import { Schema, model } from "mongoose";

export const feedbackSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "serviceRequest",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("feedback", feedbackSchema);
