import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/dataFromToken";
import Room from "@/model/room.model";
export async function POST(req: NextRequest, res: NextResponse) {
    const reqBody = await req.json()
    const { roomId } = reqBody
    const token = await getDataFromToken(req)
    if (!token) {
        return NextResponse.json({ message: "login to continue", success: false }, { status: 401 })
    }
    let response: NextResponse = NextResponse.json({ message: "Unhandled case", success: false }, { status: 500 });

    try {
        const room = await Room.findById(roomId);
        if (!room) {
            response = NextResponse.json({ message: "Room not found", success: false }, { status: 404 });
        } else if (!room.player1) {
            await Room.findByIdAndUpdate(roomId, { $set: { player1: token } });
            response = NextResponse.json({ message: "Successfully added user to game", success: true }, { status: 200 });
        } else if (room.player1 == token) {
            response = NextResponse.json({ message: "You are already in the room", success: true }, { status: 200 });
        } else if (!room.player2) {
            await Room.findByIdAndUpdate(roomId, { $set: { player2: token } });
            response = NextResponse.json({ message: "Successfully added user to game", success: true }, { status: 200 });
        }
        else if (room.player2 == token) {
            response = NextResponse.json({ message: "You are already in the room", success: true }, { status: 200 });
        } else if (room.player1 != "" || room.player2 != "") {
            response = NextResponse.json({ message: "Room is already full", success: false }, { status: 240 })
        }
    } catch (error) {
        response = NextResponse.json({ message: "Something went wrong while joining the room", success: false }, { status: 500 });
    } finally {
        return response;
    }


}