"use client";
import React, { useEffect, useState } from "react";
import LampDemo from "@/components/ui/lamp";
import Header from "../components/Header";
import axios from "axios";
interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

export default function VsComputer() {
  const [selectedOption, setSelectedOption] = useState("");
  const [computerOption, setComputerOption] = useState("");
  const [move, setMove] = useState("");
  const [makingMove, setMakingMove] = useState(false);
  const [error, setError] = useState("");
  const [gotWinner, setWinner] = useState(false);
  const [wm, setWm] = useState("");
  useEffect(() => {
    if (makingMove) {
      setMove("computer's move");
    } else {
      setMove("Your Move");
    }
  }, [makingMove]);
  const handleChange = (e: any) => {
    const temp = e.target.value;
    if (temp === "X") {
      setComputerOption("O");
      setSelectedOption("X");
    } else {
      setComputerOption("X");
      setSelectedOption("O");
    }
  };
  const [list, setList] = useState<(string | null)[]>(Array(9).fill(null));
  function Square({ value, onSquareClick }: SquareProps) {
    return (
      <button
        className="w-16 h-16 border-2 border-black dark:border-white flex items-center justify-center text-2xl font-bold"
        onClick={onSquareClick}
      >
        {value}
      </button>
    );
  }
  function calculateWinner(squares: Array<string | null>): string | null {
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
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    const isBoardFull = squares.every((square) => square !== null);
    if (isBoardFull) {
      return "Draw";
    }
    return null;
  }

  const handleClick = async (index: number) => {
    if (!makingMove && !gotWinner) {
      if (list[index] !== null) {
        return;
      }

      const newList = list.slice();
      newList[index] = selectedOption;
      setList(newList);
      const a = calculateWinner(newList);
      if (!a) {
        const temp = { arr: newList };
        setMakingMove(true);
        try {
          await axios.post("/api/users/vsComputer", temp).then((response) => {
            setMakingMove(false);
            const compIndex = response.data.index;
            newList[compIndex] = computerOption;
            const innerA = calculateWinner(newList);
            if (innerA) {
              setWm("Computer Wins");
              setWinner(true)
            }
          });
        } catch (error) {
          setError("try after some time");
        }
      } else {
        setWinner(true)
        if(a!="Draw"){
          setWm(`You Wins`);
        }
        else{
          setWm(`It's a Draw`);

        }
      }
    } else {
      setMove("wait for your Turn");
    }
  };
  return (
    <>
      <Header />
      <LampDemo />

      {!selectedOption && (
        <div className="text-white relative flex justify-center items-center min-h-96 text-2xl font-bold">
          <label>
            Select Your Symbol
            <select value={selectedOption} onChange={handleChange} className="bg-transparent">
              <option value="" disabled>
                choose
              </option>
              <option value="X" className="bg-black text-white">X</option>
              <option value="O" className="bg-black text-white">O</option>
            </select>
          </label>
        </div>
      )}
      {selectedOption && (
        <>
          <div className="absolute z-10 min-h-screen w-full  flex justify-center items-center">
            <div className="flex flex-col items-center justify-center ">
              <div className="mb-8">
                <div className="mb-4 text-xl font-semibold text-center">
                  {/* Status */}
                  <p className="text-green-400">
                    Your Symbol <>{selectedOption}</>
                  </p>
                  <p className="text-red-400">
                    Computer Symbol <>{computerOption}</>
                  </p>
                  <p>{wm}</p>
                  {!gotWinner && (
                    <>
                      <p>{move}</p>
                      <p>{error}</p>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {list.map((value, index) => (
                    <Square
                      key={index}
                      value={value}
                      onSquareClick={() => handleClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
