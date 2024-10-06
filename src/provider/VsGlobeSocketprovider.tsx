import { SocketContextProvider } from "@/context/VsGlobeContext";

const VSGlobeProvider = ({
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

export default VSGlobeProvider;
