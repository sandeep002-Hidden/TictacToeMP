import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";
export async function POST(req: NextRequest) {
  let response;
  const reqBody = await req.json();
  const { email, otp } = reqBody;
  await User.findOne({
    email: email,
  }).then(async (user) => {
    if (user.forgotPasswordToken === otp) {
      const tokenIsValid =
        user.forgotPasswordTokenExpire.getTime() > Date.now();
      if (tokenIsValid) {
        console.log("Otp");
        response = NextResponse.json({
          message: "Otp validation Success",
          success: true,
        });
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpire = undefined;
        await user.save();
      } else {
        console.log("qwerty");
        response = NextResponse.json({
          message: "Otp Time Expire",
          success: false,
        });
      }
    } else {
      console.log("user");
      response = NextResponse.json({
        message: "Otp Validation failed",
        success: false,
      });
    }
  });

  return response;
}