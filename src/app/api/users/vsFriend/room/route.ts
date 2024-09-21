import { NextRequest, NextResponse } from "next/server";
import Room from "@/model/room.model";
import { getDataFromToken } from "@/helper/dataFromToken";
import connect from "@/database/connect";
connect()
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const { roomName } = reqBody;
        const playerId = await getDataFromToken(req);

        const room = await Room.findOne({ RoomName: roomName }).select("-createdAt -updatedAt -__v");

        if (!room) {
            return NextResponse.json({ message: "No Room found", success: false }, { status: 404 });
        }

        if (room.player1 === playerId) {
            return NextResponse.json({ message: "Player found", playerNo: 1, success: true }, { status: 200 });
        } else if (room.player2 === playerId) {
            return NextResponse.json({ message: "Player found", playerNo: 2, success: true }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Unauthorized user", success: false }, { status: 401 });
        }
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
}
