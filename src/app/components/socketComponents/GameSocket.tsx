"use client";
import { useSocket } from "@/context/GameSocketContext";
import React, { useState, useEffect } from "react";
import GameChat from "./GameChat";
import LampDemo from "@/components/ui/lamp";
interface GameProp {
  gameId: string;
  roomId: string;
}
interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  border: string;
}

interface ListItem {
  move: string;
  user: string;
}

export default function GameSocket({
  gameId,
  roomId,
}: GameProp) {
  // const { gameId, symbol, player, roomId } = props;
  // console.log(gameId, symbol, player, roomId)
  const { socket, makeMove, winner } = useSocket();
  const [list, setList] = useState<ListItem[]>(
    Array(9).fill({ move: "", user: "" })
  );
  const [canClick, setClick] = useState(false);
  const [usersymbol, setUserSymbol] = useState("");
  const [playerNo, setPlayerNo] = useState("");
  const [gameWinner, setGameWinner] = useState("");
  const [gameIdd, setGameId] = useState("");
  const [roomIdd, setRoomId] = useState("");
 
  useEffect(() => {
    if (!gameId) {
      console.log("No game id");
      return;
    }
    setGameId(gameId)
  }, [gameId]);
  //room Id
  useEffect(()=>{
    if(!roomId){
      console.log("No Room")
      return
    }
    setRoomId(roomId)
    setUserSymbol(localStorage.getItem(`${roomId}as`)!)
    setPlayerNo(localStorage.getItem(`${roomId}`)!)
  },[roomId])

  //first move can click or not
  useEffect(() => {
    if (playerNo == "1" && !canClick) {
      setClick(true);
    }
  }, [playerNo]);
  //socket
  useEffect(() => {
    if (!socket) return;
    socket.on("move", (data: any) => {
        if (data.symbol == "X") {
          setUserSymbol("O");
        } else {
          setUserSymbol("X");
        }
      calculateWinner(data.newList);
      setList(data.newList);
      setClick(true);
    });
    socket.on("winner", (data: any) => {
      console.log(data)
      setGameWinner(data.winner);
      localStorage.removeItem(data.roomId)
      localStorage.removeItem(`${data.roomId}as`)
      setClick(false);
    });
    return () => {
      socket.off("move");
    };
  });
  function Square({ value, onSquareClick, border }: SquareProps) {
    const borderClass = border
      ? `border--400`
      : "border-black dark:border-white";
    return (
      <button
        className={`w-16 h-16 border-2 flex items-center justify-center text-2xl font-bold ${borderClass}`}
        onClick={onSquareClick}
      >
        {value}
      </button>
    );
  }
  // const makecolour = (winner: string, winmove: number[], player: string) => {
  //   return (
  //     <>
  //       <div className="">
  //         {list.map((value, index) => (
  //           <Square
  //             key={index}
  //             value={value.move}
  //             onSquareClick={() => {
  //               alert("game over");
  //             }}
  //             border={
  //               winmove.includes(index)
  //                 ? winner === player
  //                   ? "green"
  //                   : "red"
  //                 : "yellow"
  //             }
  //           />
  //         ))}
  //       </div>
  //     </>
  //   );
  // };
  function calculateWinner(squares: ListItem[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a].move &&
        squares[a].move === squares[b].move &&
        squares[a].move === squares[c].move
      ) {
        const winmove = [a, b, c];
        winner(gameId, list, squares[a].user, winmove,roomId);
        // makecolour(squares[a].user, winmove, player);
        return;
      }
    }
    const isBoardFull = squares.every((square) => {
      square.move !== null;
    });
    if (isBoardFull) {
      console.log("Draw");
    }
    return null;
  }
  const handleClick = (index: number) => {
    console.log(playerNo);
    if (!canClick) {
      if (gameWinner != "") {
        alert(`game over`);
        return;              
      }
      alert("wait for opponents move");
      return;
    }
    const newList = [...list];
    newList[index] = {
      ...newList[index],
      move: usersymbol,
      user: playerNo,
    }; // Update the object at the specified index
    calculateWinner(newList);
    setList(newList);
    makeMove(gameId, usersymbol, newList);
    setClick(false);
  };
  return (
    <>
      <LampDemo />
      <div className="absolute min-h-screen w-full  flex justify-around items-center flex-col">
        <div className="flex flex-col items-center justify-center ">
          {gameWinner != "" && (
            <h1>{`Game Over and ${
              gameWinner === playerNo ? "You wins" : "Opponent Wins"
            }`}</h1>
          )}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-2">
              {list.map((value, index) => (
                <Square
                  key={index}
                  value={value.move}
                  onSquareClick={() => handleClick(index)}
                  border=""
                />
              ))}
            </div>
          </div>
          <div></div>
        </div>
        {/* <GameChat gameId={gameId} player={parseInt(player)} /> */}
      </div>
    </>
  );
}
