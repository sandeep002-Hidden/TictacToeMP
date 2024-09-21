import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface arrayType{
  move:string;
  user:string;
}

interface GSocketContext {
  socket: any;
  isSocketConnected: boolean;
  makeMove:(gameId:string,symbol:string,newList:arrayType[])=>void
  winner:(gameId:string,moves:arrayType[],winner:string,winmove:number[])=>void
  sendMessage: (roomName: string, message: string) => void;

}
export const GameSocketContext = createContext<GSocketContext | null>(null);
export const GameSocketContextProvider = ({
  children,
  GameId,
}: {
  children: React.ReactNode;
  GameId: string;
}) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isSocketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected",newSocket.id);
      setSocketConnected(true);
      newSocket.emit("gamestart",GameId)
    });
    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setSocketConnected(false);
    });
    return () => {
      newSocket.disconnect();
    };
  }, [GameId]);

  const sendMessage = (roomName: string, message: string) => {
    if (socket && isSocketConnected) {
      socket.emit("chatMessage", roomName, message);
    }
  };
  const makeMove=(gameId:string,symbol:string,newList:arrayType[])=>{
    if (socket && isSocketConnected) {
          socket.emit("move",gameId,symbol,newList)
        }
  }
  const winner=(gameId:string,moves:arrayType[],winner:string,winmove:number[])=>{
    if(socket && isSocketConnected){
      socket.emit("winner",gameId,moves,winner,winmove)
    }
  }
  return (
    <GameSocketContext.Provider
      value={{
        socket,
        isSocketConnected,
        sendMessage,
        makeMove,
        winner,
      }}
    >
      {children}
    </GameSocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(GameSocketContext);
  if (context === null) {
    throw new Error("useSocket must be used within SocketContextProvider");
  }
  return context;
};