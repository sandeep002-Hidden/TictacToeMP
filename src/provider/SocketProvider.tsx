import { SocketContextProvider } from "@/context/SocketContext";

const SocketProvider = ({
  children,
  roomName,
}: {
  children: React.ReactNode;
  roomName: string;
}) => {
  return (
    <SocketContextProvider roomName={roomName}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketProvider;
