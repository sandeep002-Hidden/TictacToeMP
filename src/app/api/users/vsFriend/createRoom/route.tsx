import { NextRequest, NextResponse } from "next/server";
import connect from "@/database/connect";
import bcryptjs from "bcryptjs";
import Room from "@/model/room.model";
import { getDataFromToken } from "@/helper/dataFromToken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const { RoomName, roomPassword } = reqBody;
    const room = await Room.findOne({ RoomName });
    if (room) {
      return NextResponse.json({
        message: "Room with this name already exists",
      });
    }
    const adminId=await getDataFromToken(req)
    console.log(adminId)
    const newRoom = new Room({
      RoomName,
      roomPassword,
      player1:adminId
    });

    await newRoom.save();
    return NextResponse.json({ message: "Created Room",success:true });
  } catch (error:any) {
    console.log(error.message)
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
