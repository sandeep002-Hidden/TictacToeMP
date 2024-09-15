import { NextRequest, NextResponse } from "next/server";
import Room from "@/model/room.model";
import connect from "@/database/connect";
import { getDataFromToken } from "@/helper/dataFromToken";

getDataFromToken;
connect();
export async function POST(req: NextRequest) {
  let response;
  const reqBody = await req.json();
  const { RoomName, roomPassword } = reqBody;
  await Room.findOne({ RoomName })
    .then(async (result: any) => {
      if (!result) {
        response = NextResponse.json({
          message: "Invalid Room name",
          success: false,
        });
      }
      if (result.roomPassword === roomPassword) {
        const player2Id = await getDataFromToken(req);
        await Room.updateOne(
          { RoomName },
          { $set: { player2: player2Id } }
        ).then(() => {
          response = NextResponse.json({ message: "From BE", success: true });
        });
      } else {
        response = NextResponse.json({
          message: "Incorrect password",
          success: false,
        });
      }
    })
    .catch((error: any) => {
      response = NextResponse.json({ message: error.message, success: false });
    });
  return response;
}
