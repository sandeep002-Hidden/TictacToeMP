import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export async function getDataFromToken(req:NextRequest) {
    try {
        const enToken=req.cookies.get("nexttoken")?.value||""
        const Token:any=jwt.verify(enToken,process.env.JWTSECRETE!)
        const id=Token.id
        return id;
    } catch (error:any) {
        throw new Error(error.message)
        
    }
}