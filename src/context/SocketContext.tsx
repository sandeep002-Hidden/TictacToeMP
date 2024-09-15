import { connect } from "http2";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
interface iSocketContext {}
export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isSocketConnected,setSocketConnected]=useState(false)
  useEffect(()=>{
    const newSocket=io()
    setSocket(newSocket)
    return ()=>{
        newSocket.disconnect()
    }
  },[])
  useEffect(()=>{
    if(socket===null) return
    if(socket.connected){
        setSocketConnected(true)
    }
    socket.on("connect",()=>{
        setSocketConnected(true)
    })
    socket.on("disconnec",()=>{
        setSocketConnected(false)

    })
    return ()=>{

        socket.off("connect",()=>{
            setSocketConnected(true)
        })
        socket.off("disconnec",()=>{
            setSocketConnected(true)
        })
    }
  },[socket]
)
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error("useSocket must be used within SocketContectProvider");
  }
  return context;
};
