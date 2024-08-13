import { useState, useEffect } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}
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

interface BoardProps {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const [gameOver, setGameOver] = useState(false);
  let status:any;

  useEffect(() => {
    if (status && (status.includes('wins') || status === "It's a Draw")) {
      setGameOver(true);
    }
  }, [status]);

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  if (winner === 'X' || winner === 'O') {
    status = `${winner === 'X' ? 'Player 1' : 'Player 2'} wins the game`;
  } else if (winner === 'Draw') {
    status = "It's a Draw";
  } else {
    status = 'Next player: ' + (xIsNext ? 'Player 1' : 'Player 2');
  }

  return (
    <>
      <div className="relative">
        <div className="mb-4 text-xl font-semibold">{status}</div>
        <div className="grid grid-cols-3 gap-2">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<string | null>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="absolute z-10 min-h-screen w-full  flex justify-center items-center">
      <div className="flex flex-col items-center justify-center ">
        <div className="mb-8">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
      </div>
    </div>
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  const isBoardFull = squares.every((square) => square !== null);
  if (isBoardFull) {
    return 'Draw';
  }
  return null;
}
