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
  const [roomId, setRoomId] = useState("");
  useEffect(() => {
    const link = params.match;
    const arr = link.split("-");
    // console.log(arr);
    setGameId(arr[0]);
    setRoomId(arr[1]);
  }, [params.match]);
  //setting player No
  useEffect(() => {
    const player = localStorage.getItem(roomId);
    if (!player) {
      return;
    } else {
      setPlayer(player);
    }
  }, [player]);

  useEffect(() => {
    const symbol = localStorage.getItem(`${roomId}as`);
    if (symbol) {
      setUserSymbol(symbol);
    } else {
      setUserSymbol("n");
    }
  });
  useEffect(() => {
    const UpdateGame = async (gameId: string) => {
      if (!gameId) {
        return;
      }
      console.log(gameId);
      await axios.post("/api/users/arena/match", { gameId }).then((result) => {
        // console.log(result);
      });
    };
    UpdateGame(gameId);
  }, [gameId]);
  useEffect(()=>{
    console.log(gameId)
  },[])
  return (
    <>
      <GameSocketProvider GameId={gameId}>
        <div className="h-fit">
          <GameSocket gameId={gameId} roomId={roomId} />
        </div>
      </GameSocketProvider>
    </>
  );
}
// }
