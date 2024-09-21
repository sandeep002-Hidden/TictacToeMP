"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import GameSocketProvider from "@/provider/GameSocketProvider";
import GameSocket from "@/app/components/socketComponents/GameSocket";
import GameChat from "@/app/components/socketComponents/GameChat";
export default function page({ params }: any) {
  const [gameId, setGameId] = useState("");
  const [userSymbol, setUserSymbol] = useState("");
  const [player, setPlayer] = useState("");
  useEffect(() => {
    const player = localStorage.getItem("player");
    if (!player) {
      return;
    } else {
      setPlayer(player);
    }
  }, [player]);
  useEffect(() => {
    const symbol = localStorage.getItem("admin-symbol");
    if (symbol) {
      setUserSymbol(symbol);
    } else {
      setUserSymbol("n");
    }
  });

  useEffect(() => {
    setGameId(params.match);
  }, [params.match]);
  useEffect(() => {
    if (!gameId) {
      return;
    }
    const UpdateGame = async (gameId: string) => {
      await axios
        .post("/api/users/arena/match", { gameId })
        .then((result) => {});
    };
    UpdateGame(gameId);
  });
  return (
    <>
    
    <GameSocketProvider GameId={gameId}>
      <>
        <GameSocket gameId={gameId} symbol={userSymbol} />
      </>
    </GameSocketProvider>
    </>
  );
}
// }
