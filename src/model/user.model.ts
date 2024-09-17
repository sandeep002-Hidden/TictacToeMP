import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Provide Your Email"],
      unique: [true, "Email already Exist"],

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
    },
    gameHistory:{
      type:Array,
      default:[]
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    Otp:Number,
    OtpExpiry:Date,
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;