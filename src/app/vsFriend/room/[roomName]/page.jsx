"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import SocketProvider from "../../../../provider/SocketProvider";
export default function RoomName({ params }) {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");

  const startMatch = () => {
    alert("soon");
  };

  return (
    <SocketProvider>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white">
        <p>{message}</p>
        <h1>Room {roomName}</h1>

        <div
          className="border-2 border-white p-2 rounded-lg"
          onClick={startMatch}
        >
          Start Match
        </div>
      </div>
    </SocketProvider>
  );
}
