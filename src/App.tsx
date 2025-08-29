import Square from "./components/Square";
import { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  const x: string = "X";
  const o: string = "O";

  // Hantera klick på en square
  function handleClick(index: number) {
    if (squares[index] || winner) return; // Om rutan redan innehåller något annat än null, gör inget

    const newSquares = [...squares]; // Kopiera squares arrayen
    newSquares[index] = xIsNext ? x : o; // Sätt "X" eller "O" på indexet beroende på tur
    setSquares(newSquares); // Uppdatera suquares state med den nya arrayen
    setXIsNext(!xIsNext); // Växla tur

    calculateWinner(newSquares);
  }

  // Ta reda på vinanren
  function calculateWinner(newSquares: (string | null)[]) {
    console.log(newSquares);

    const lines: number[][] = [
      [0, 1, 2], // rad 1
      [3, 4, 5], // rad 2
      [6, 7, 8], // rad 3
      [0, 3, 6], // kolumn 1
      [1, 4, 7], // kolumn 2
      [2, 5, 8], // kolumn 3
      [0, 4, 8], // diagonal \
      [2, 4, 6], // diagonal /
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        setWinner(newSquares[a]);

        return;
      }
    }

    if (!newSquares.includes(null) && !winner) {
      setWinner("Tie");
    }
  }

  // Restart och nollställ spelet
  function restartGame() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  }

  let statusMessage: string;

  if (winner === "Tie") {
    statusMessage = "It's a tie! 🤝";
  } else {
    statusMessage = winner
      ? `Winner is: ${winner} 🎉`
      : `Next player: ${xIsNext ? "x" : "o"}`;
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>

      <h2 className="statusMessage">{statusMessage} </h2>

      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>

        <button className="restart" onClick={() => restartGame()}>
          Restart
        </button>
      </div>
    </>
  );
}

export default App;
