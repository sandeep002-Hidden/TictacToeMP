import connect from "@/database/connect";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";


connect()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email,username, password } = reqBody;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return NextResponse.json({ message: "Email Already Exists" });
    }
    const avUser = await User.findOne({ username });
    if (avUser) {
      return NextResponse.json({
        message: "UserName already exists Already Exists",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      userName:username,
      email,
      password: hashedPassword,
    });
    const userQ = await newUser.save()
    console.log("From Signup Backend");
    await sendEmail({ email, emailType: "VERIFY", userId: userQ._id });
    return NextResponse.json({ message: "user Registered Success fully" ,success:true});
  } catch (error: any) {
    console.log("Error in Signup post");
  }
}