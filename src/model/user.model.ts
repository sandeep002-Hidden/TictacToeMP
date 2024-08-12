import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "Provide the FirstName"],
    },
    userName: {
      type: String,
      required: [true, "Username Required"],
      unique: [true, "UserName already Exist"],
    },
    password: {
      type: String,
      required: [true, "Password must required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;