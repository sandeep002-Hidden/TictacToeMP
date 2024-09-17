import { NextRequest, NextResponse } from "next/server";
import Room from "@/model/room.model";
import { getDataFromToken } from "@/helper/dataFromToken";


export async function POST(req: NextRequest, res: NextResponse) {
    let response
    try {
        const reqBody = await req.json();
        const { roomName } = reqBody
        const playerId = await getDataFromToken(req);
        await Room.findOne({ RoomName: roomName }).select("-createdAt -updatedAt -__v").then((room) => {
            if (!room) {
                response = NextResponse.json({ message: "No Room found", success: false }, { status: 500 })
            }
            else if (room.player1 == playerId) {
                response = NextResponse.json({ message: "player found", PlayerNo: 1, success: true }, { status: 200 })
            }
            else if (room.player2 == playerId) {
                response = NextResponse.json({ message: "playern Found", playerNo: 2, success: true }, { status: 200 })
            }
            else {
                response = NextResponse.json({ message: "un authorize user", success: false }, { status: 401 })
            }
        })
        return response


    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}