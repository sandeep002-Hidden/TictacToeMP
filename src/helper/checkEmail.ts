import { NextRequest,NextResponse } from "next/server";
import connect from "@/database/connect"
import User from "@/model/user.model";
connect()
export default async function checkEmail(email:String) {
    let s
    await User.find({email:email}).then((user)=>{
        if(user[0]){
            s=true
        }
        else{
            s=false
        }
    })
    return s;
}