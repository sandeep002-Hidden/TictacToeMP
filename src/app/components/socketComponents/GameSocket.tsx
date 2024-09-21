"use client";
import { useSocket } from "@/context/GameSocketContext";
import React, { useState, useEffect } from "react";
import GameChat from "./GameChat";

interface GameProp {
  gameId: string;
  symbol: string;
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

export default function GameSocket({ gameId, symbol }: GameProp) {
  const { socket, makeMove, winner } = useSocket();
  const [list, setList] = useState<ListItem[]>(
    Array(9).fill({ move: "", user: "" })
  );
  const [canClick, setClick] = useState(false);
  const [usersymbol, setUserSymbol] = useState("");
  const [player, setPlayer] = useState("");
  //symbol
  useEffect(() => {
    if (!symbol) {
      return;
    }
    setUserSymbol(symbol);
  }, [symbol]);
  // player No
  useEffect(() => {
    const player = localStorage.getItem("player");
    if (player) {
      setPlayer(player);
    } else {
      console.log("Return sand start again the game");
    }
  }, []);
  //first move can click or not
  useEffect(() => {
    if (localStorage.getItem("player") == "1" && !canClick) {
      setClick(true);
    }
  }, []);
  //socket
  useEffect(() => {
    if (!socket) return;
    socket.on("move", (data: any) => {
      if (usersymbol == "n") {
        if (data.symbol == "X") {
          setUserSymbol("O");
        } else {
          setUserSymbol("X");
        }
      }
      calculateWinner(data.newList);
      setList(data.newList);
      setClick(true);
    });
    socket.on("winner", (data: any) => {
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
  const makecolour = (winner: string, winmove: number[], player: string) => {
    return (
      <>
        <div className="">
          {list.map((value, index) => (
            <Square
              key={index}
              value={value.move}
              onSquareClick={() => {
                alert("game over");
              }}
              border={
                winmove.includes(index)
                  ? winner === player
                    ? "green"
                    : "red"
                  : "yellow"
              }
            />
          ))}
        </div>
      </>
    );
  };
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
        winner(gameId, list, squares[a].user, winmove);
        makecolour(squares[a].user, winmove, player);
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
    if (!canClick) {
      alert("it's opponents time for move");
      return;
    }
    const newList = [...list];
    newList[index] = { ...newList[index], move: usersymbol, user: player }; // Update the object at the specified index
    calculateWinner(newList);
    setList(newList);
    makeMove(gameId, usersymbol, newList);
    setClick(false);
  };
  return (
    <>
      <div className="absolute z-10 min-h-screen w-full  flex justify-center items-center">
        <div className="flex flex-col items-center justify-center ">
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
          <div>
          <GameChat gameId={gameId} player={parseInt(player)} />
          </div>
        </div>
      </div>
    </>
  );
}