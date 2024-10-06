import { NextRequest, NextResponse } from "next/server";
import Room from "@/model/room.model.js";
// src\app\api\users\vsGlobe\verifyRoom\
import { getDataFromToken } from "@/helper/dataFromToken";
export async function POST(req: NextRequest, res: NextResponse) {
    const reqBody = await req.json()
    const { roomName } = reqBody
    try {
        const room = await Room.findOne({ _id: roomName })
        if (!room) {
            return NextResponse.json({ message: "No present with this Name", success: false }, { status: 404 })
        }
        const token = await getDataFromToken(req)
        if (room.player1 != token && room.player2 != token) {
            return NextResponse.json({ message: "Access to Room denied", success: false }, { status: 403 })
        }
        let playerNo
        if(room.player1==token){
            playerNo=1
        }else{
            playerNo=2
        }
        return NextResponse.json({ message: "Welcome", success: true, roomName: room.RoomName,playerNo }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "error while verifying game", success: false }, { status: 500 })
    }
}