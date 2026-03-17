import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [80, "Name must be at most 80 characters"],
      default: "",
    },
    relationship: {
      type: String,
      required: [true, "Relationship is required"],
      enum: ["Branch mate", "Junior", "Other"],
    },
    relationshipOther: {
      type: String,
      trim: true,
      maxlength: [120, "Please keep the custom relationship under 120 characters"],
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

messageSchema.pre("validate", function validateRelationship(next) {
  if (this.relationship === "Other" && !this.relationshipOther?.trim()) {
    this.invalidate(
      "relationshipOther",
      "Please specify your connection when selecting Other"
    );
  }

  if (this.relationship !== "Other") {
    this.relationshipOther = "";
  }

  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
