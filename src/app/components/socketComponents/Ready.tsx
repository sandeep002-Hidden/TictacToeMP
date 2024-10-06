import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from 'next/navigation'

interface ReadyProp {
  roomName: string;
}
interface mathstartedProp{
  newGame:string;
  roomName:string;
}
export default function Ready({ roomName }: ReadyProp) {
  const router = useRouter()
  const { socket, readyForMatch } = useSocket();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.on("wait",(message:string)=>{
      console.log("get ready for match")
    })
    socket.on("readyforGame", (data: any) => {
      setIsReady(data.isReady);
    });
    socket.on("matchStarted", (data:mathstartedProp) => {
      router.push(`/arena/${data.newGame}-${data.roomName}`)
    });
    return () => {
      socket.off("readyforGame");
      socket.off("matchStarted")
    };
  }, [socket]);

  const ready = () => {
    readyForMatch(roomName, true);
  };

  return (
    <button className="border-2 border-white p-2 rounded-lg" onClick={ready}>
      {isReady ? "Already Ready" : "Ready"}
    </button>
  );
}
