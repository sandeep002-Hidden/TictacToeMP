import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const reqBody = await req.json();
    let res;
    const arr=reqBody.arr
    const tempArr=[]
    for(const index in arr){
        if(arr[index]===null){
            tempArr.push(index)
        }
    }
    if(tempArr.length===0){
        res=NextResponse.json({Message:"May Be its a draw"})
    }
    else{
        const randomIndex = Math.floor(Math.random() * tempArr.length);
        const randomItem = tempArr[randomIndex];
        res=NextResponse.json({message:"qqq",index:randomItem})
    }
    return res;
}