import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/dataFromToken";
import connect from "@/database/connect";
import Room from "@/model/room.model";
connect();

export async function GET(req: NextRequest) {
    const userId =await getDataFromToken(req);
    if (!userId) {
        return NextResponse.json(
            { message: "Login to continue", success: false },
            { status: 401 }
        );
    }
    try {
        const rooms = await Room.find({
            $or: [{ player1: userId }, { player2: userId }],
        },{isOpen:false}).select("roomPassword RoomName -_id");

        if (!rooms || rooms.length === 0) {
            return NextResponse.json(
                { message: "No rooms found", success: false },
                { status: 404 }
            );
        }
        return NextResponse.json({
            message: "Got rooms",
            success: true,
            rooms,
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message, success: false },
            { status: 500 }
        );
    }
}
