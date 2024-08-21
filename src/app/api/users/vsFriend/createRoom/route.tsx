import { NextRequest, NextResponse } from "next/server";
import connect from "@/database/connect";
import bcryptjs from "bcryptjs";
import Room from "@/model/room.model";

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
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(roomPassword, salt);
    const newRoom = new Room({
      RoomName,
      roomPassword,
      password: hashedPassword,
    });
    await newRoom.save();
    return NextResponse.json({ message: "Got Message" });
  } catch (error:any) {
    console.log(error.message)
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
