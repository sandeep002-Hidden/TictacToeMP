import { NextRequest, NextResponse } from "next/server";
import Game from "@/model/game.model";
import { getDataFromToken } from "@/helper/dataFromToken";
import connect from "@/database/connect";
connect()
// src\app\api\users\arena\match\route.ts
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { gameId } = reqBody;
        let response;
        const result = await Game.findOne({ _id: gameId }).select("-updatedAt -createdAt -__v -_id -_moves -winner")
        if (!result) {
            NextResponse.json({ message: `No GameFound in this Id ${gameId}`, success: false }, { status: 401 })
        }
        const playerId = await getDataFromToken(req)
        if (!result.player1 || result.player1 === playerId) {
            await Game.findByIdAndUpdate({ _id: gameId }, { $set: { player1: playerId } })
            response = NextResponse.json({ message: "Updates successfully", success: true }, { status: 200 })
        } else if (!result.player2 || result.player2 === playerId) {
            await Game.findByIdAndUpdate({ _id: gameId }, { $set: { player2: playerId } })
            response = NextResponse.json({ message: "Updates successfully", success: true }, { status: 200 })
        }
        else {
            response = NextResponse.json({ message: "Room is full", success: false }, { status: 403 })
        }
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}