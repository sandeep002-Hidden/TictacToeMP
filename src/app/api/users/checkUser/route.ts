import { NextRequest,NextResponse } from "next/server";
import checkEmail from "@/helper/checkEmail";
import connect from "@/database/connect";
import User from "@/model/user.model";
import { sendEmail } from "@/helper/mailer";


connect()

export async function POST(req:NextRequest) {
    const Req= await req.json()
    const {email}=Req
    const checkMailRes=await checkEmail(email)
    if(!checkMailRes){
        return NextResponse.json({message:"No user found in this email",success:false})
    }
    const user=await User.findOne({email:email})
    const userId=user._id
    await sendEmail({email,emailType:"RESET",userId:userId})
    return NextResponse.json({message:"Otp Send Check yor Email",success:true})
}