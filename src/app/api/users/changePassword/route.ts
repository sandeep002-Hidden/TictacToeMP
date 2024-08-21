import connect from "@/database/connect"
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";

connect();

export async function POST(req: NextRequest) {
  let response;
  const reqBody = await req.json();
  const { email, password } = reqBody;
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  try {
    await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    ).then((updateRes) => {
      response = NextResponse.json({
        message: "Password Changed Success fully",
        success: true,
      });
      response.cookies.delete("nexttoken")
    });
  } catch (error: any) {
    console.log(error.message);
    response = NextResponse.json({
      message: "Error occur while changing password",
      success: false,
    });
  } finally {
    return response;
  }
}