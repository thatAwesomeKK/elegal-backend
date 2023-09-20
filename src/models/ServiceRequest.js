import { Schema, model } from "mongoose";

export const serviceRequestSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    caseType: {
      type: String,
      required: [
        function () {
          return this.type === "advocate";
        },
        "Case Type is required",
      ],
    },
    price: {
      type: String,
      required: [
        function () {
          return this.type === "notary";
        },
        "Price is required",
      ],
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    LegalProviderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    PotentialProviders: [
      {
        uid: { type: Schema.Types.ObjectId, ref: "user" },
        price: {
          type: String,
        },
      },
    ],
    life: {
      type: String,
      required: true,
      default: "created",
    },
  },
  { timestamps: true }
);

export default model("serviceRequest", serviceRequestSchema);
