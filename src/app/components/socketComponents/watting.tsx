import { useState, useEffect } from "react";
import { useSocket } from "@/context/VsGlobeContext";
import { useRouter } from "next/navigation";
interface wattingProp {
  roomName: string;
}
export default function Waitting({ roomName }: wattingProp) {
  const [isPlayerJoined, setPlayerJoined] = useState(false);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Waitting for another player to Join");
  const { socket,svGobmatch  } = useSocket();
  const router=useRouter()
  useEffect(() => {
    if (!socket) {
      return;
    }
    //
    socket.on("userJoined", (data: any) => {
    setCount((prevCount) => prevCount + 1);
      console.log("player joiied the game");
    });
    socket.on("gobMatchStarted", (data: any) => {
      const {newGame,roomName,admin}=data
      router.push(`/arena/${newGame}-${roomName}`)
      console.log(newGame,roomName,admin)
    });
    return () => {
      socket.off("userJoined");
      socket.off("gobMatchStarted")
    };
  }, [socket]);
  useEffect(() => {
    if(count==2){
        svGobmatch(roomName)
    }
    console.log(count);
  }, [count]);
  return (
    <>
      <h1>{message}</h1>
    </>
  );
}
