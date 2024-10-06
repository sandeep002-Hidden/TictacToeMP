import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface iSocketContext {
  socket: any;
  isSocketConnected: boolean;
  sendMessage: (roomName: string, message: string) => void;
  readyForMatch: (roomName: string, isReady: boolean) => void;
  startMatch: (roomName: string) => void;
}

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({
  children,
  roomName,
}: {
  children: React.ReactNode;
  roomName: string;
}) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isSocketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected");
      setSocketConnected(true);
      newSocket.emit("joinRoom", roomName);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setSocketConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomName]);
  const sendMessage = (roomName: string, message: string) => {
    if (socket && isSocketConnected) {
      socket.emit("chatMessage", roomName, message);
    }
  };
  const readyForMatch = (roomName: string, isReady: boolean) => {
    if (socket && isSocketConnected) {
      socket.emit("readyforGame", roomName, isReady);
    }
  };
  const startMatch = (roomName: string) => {
    if (socket && isSocketConnected) {
      socket.emit("startMatch", roomName);
    }
  };
  return (
    <SocketContext.Provider
      value={{
        socket,
        isSocketConnected,
        sendMessage,
        readyForMatch,
        startMatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error("useSocket must be used within SocketContextProvider");
  }
  return context;
};
