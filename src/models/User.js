import { Schema, model } from "mongoose";

export const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    surName: {
      type: String,
    },
    pfp: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "buyer",
    },
    type: {
      type: String,
      required: [
        function () {
          return this.role !== "buyer";
        },
        "Type is required",
      ],
    },
    licenseId: {
      type: String,
      required: [
        function () {
          return this.role !== "buyer";
        },
        "License Id is required",
      ],
    },
    specialization: {
      type: String,
      required: [
        function () {
          return this.type === "advocate";
        },
        "Specialization is required",
      ],
    },
    matchRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "serviceRequest",
      },
    ],
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "feedback",
      },
    ],
  },
  { timestamps: true }
);

export default model("user", userSchema);
