import { GameSocketContextProvider } from "@/context/GameSocketContext";

const GameSocketProvider = ({
  children,
  GameId,
}: {
  children: React.ReactNode;
  GameId: string;
}) => {
  return (
    <GameSocketContextProvider GameId={GameId}>
      {children}
    </GameSocketContextProvider>
  );
};

export default GameSocketProvider;
