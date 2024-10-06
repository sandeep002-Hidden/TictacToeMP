import { NextRequest, NextResponse } from "next/server";
import Room from "@/model/room.model.js";
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const rooms = await Room.find({ isOpen: true }).select("RoomName player1 player2").limit(10)
        return NextResponse.json({ message: "Got rooms", success: true, rooms }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ messge: "Error occur while getting romm info", success: false }, { status: 500 })
    }

}