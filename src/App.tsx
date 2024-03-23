/*Gnerando una aplicación en de 100 lineas de codigo*/

import { useState } from "react";

import "./App.css";

const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8],
];

const INITIAL_STATE = new Array(9).fill("");
enum Player {
  X = "X",
  O = "O",
}

enum Status {
  Playing = "PLAYING",
  Draw = "DRAW",
  XWON = "XWON",
  OWON = "OWON",
}

function App() {
  const [turn, setTurn] = useState<Player>(Player.X);
  const [cells, setCells] = useState<(Player | "")[]>(INITIAL_STATE);
  const [status, setStatus] = useState<Status>(Status.Playing);

  function handleClick(index: number) {
    if (status !== Status.Playing || cells[index] !== "") return;

    const newCells = [...cells];
    newCells[index] = turn;
    setCells(newCells);

    const hasWon = winning.some((combo) =>
      combo.every((cell) => newCells[cell] === turn)
    );

    if (hasWon) {
      setStatus(turn === Player.X ? Status.XWON : Status.OWON);
    } else if (!newCells.some((cell) => cell === "")) {
      setStatus(Status.Draw);
    } else {
      setTurn(turn === Player.X ? Player.O : Player.X);
    }
  }

  function handleReset() {
    setCells(INITIAL_STATE);
    setStatus(Status.Playing);
    setTurn(Player.X);
  }
  // console.log(turn)
  return (
    <main className="Block">
      <section className="Turn">
        <p>Turno de {turn}</p>
      </section>
      <div className="board ">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell ? "selected" : ""}`}
            data-cell={turn === Player.X ? "X" : "O"}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {status != Status.Playing && (
        <article className="alert" role="alert">
          
          {(status === Status.Draw && "Empate") ||
            (status === Status.OWON && "Gano O") ||
            (status === Status.XWON && "Gano X")}
          <button className="restart" onClick={handleReset}>
            Reiniciar
          </button>
        </article>
      )}
    </main>
  );
}

export default App;
