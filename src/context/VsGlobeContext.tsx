import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
interface iGlobeSocketContext {
  socket: any;
  isSocketConnected: boolean;
}
export const VsGlobeContext = createContext<iGlobeSocketContext | null>(null);
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
      setSocketConnected(true);
      newSocket.emit("joined-vsGlobe", roomName);
    });
    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setSocketConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomName]);



  return (
    <VsGlobeContext.Provider
      value={{
        socket,
        isSocketConnected,
      }}
    >
      {children}
    </VsGlobeContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(VsGlobeContext);
  if (context === null) {
    throw new Error("useSocket must be used within SocketContextProvider");
  }
  return context;
};
