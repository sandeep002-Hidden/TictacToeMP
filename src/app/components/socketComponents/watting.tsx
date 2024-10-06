import { useState, useEffect } from "react";
import { useSocket } from "@/context/VsGlobeContext";
interface wattingProp {
  roomName: string;
}
export default function Waitting({ roomName }: wattingProp) {
  const [isPlayerJoined, setPlayerJoined] = useState(false);
  const [message,setMessage]=useState("Waitting for another player to Join")
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket){
        return
    }
    socket.on("userJoined", (data: any) => {
        console.log("hello")
    });
    socket.on("userIsOnline",(data:any)=>{
        console.log("user Is online")
    })
    return () => {
      socket.off("userJoined");
      socket.off("userIsOnline")
    };
  }, [socket]);
  return (
    <>
      <h1>{message}</h1>
    </>
  );
}
