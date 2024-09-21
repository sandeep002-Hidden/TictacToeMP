import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from 'next/navigation'
interface StartProp {
  roomName: string;
  symbol:string
}
export default function StartMatch({ roomName,symbol }: StartProp) {
  const router = useRouter()
  const { socket, startMatch } = useSocket();
  const [matchStarted, setMatchStarted] = useState(false);
  useEffect(() => {
    if (!socket) return;
    socket.on("wait",(message:string)=>{
      console.log("wai for player to get ready")
    })
    socket.on("emit",(message:string)=>{
      console.log(message)
    })
    socket.on("matchStarted", (matchId:Object) => {
      console.log(matchId)
      router.push(`/arena/${matchId}`)
    });
    return () => {
      socket.off("matchStarted");
      socket.off("emit");
    };
  }, [socket]);
  const getStarted = () => {
    localStorage.setItem("admin-symbol",symbol)
    startMatch(roomName);
  };
  return (
    <div>
      <button
        className="border-2 border-white p-2 rounded-lg"
        onClick={getStarted}
        disabled={matchStarted}
      >
        {matchStarted ? "Match Started" : "Start Match"}
      </button>
    </div>
  );
}
