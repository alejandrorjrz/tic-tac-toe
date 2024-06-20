import { useState } from "react";
import Campo from "./components/Campo.component";

const emptyValores = Array(9).fill("");

function App() {
  const [valores, setValores] = useState<string[]>(emptyValores);
  const [turno, setTurno] = useState<boolean>(true);

  const jugador1 = "✖";
  const jugador2 = "⓿";

  // Definición de combinaciones ganadoras
  const combinacionGanadora: number[][] = [
    [0, 1, 2], // Primera fila horizontal
    [3, 4, 5], // Segunda fila horizontal
    [6, 7, 8], // Tercera fila horizontal
    [0, 3, 6], // Primera columna vertical
    [1, 4, 7], // Segunda columna vertical
    [2, 5, 8], // Tercera columna vertical
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal inversa
  ];

  // Función que maneja el clic y toma un id como parámetro
  const handleClick = (id: number) => {
    // Crear una copia del array de valores
    const newValores = [...valores];
    newValores[id - 1] = turno ? jugador1 : jugador2; // Actualizar el valor en la posición dada por id
    setValores(newValores);
    setTurno(!turno);
  };

  // Función para comprobar si hay un ganador
  const checkWinner = (board: string[]): string | null => {
    for (const combo of combinacionGanadora) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isBoardFull = (valores: string[]): boolean => {
    return valores.every((cell) => cell !== "");
  };

  let finalPartida: string = "";
  const newValores = [...valores];
  if (isBoardFull(newValores)) {
    finalPartida = "¡Partida finalizada en empate!";
  }

  // Comprobar si hay un ganador después de cada jugada
  const winner = checkWinner(valores);
  if (winner) {
    finalPartida = !turno ? "¡Ganador jugador 1!" : "¡Ganador jugador 2!";
    console.log("has ganado");
  }

  const onClickRestart = () => {
    setValores(emptyValores);
    setTurno(true);
  };

  return (
    <div className="bg-slate-800 min-h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="text-6xl text-blue-500 text-center mb-8">tic-tac-toe</h1>
      </div>
      <div>
        {!winner && !isBoardFull(valores) ? (
          <h2 className="text-3xl text-white text-center mb-8">
            {turno ? "Jugador 1 = ✖" : "Jugador 2 = ⓿"}
          </h2>
        ) : (
          <h2 className="text-3xl text-white text-center mb-8">
            {finalPartida}
          </h2>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {valores.map((value, index) => (
          <Campo
            key={index}
            id={index + 1}
            value={value}
            onClick={handleClick}
            isClickable={!winner ? !value : false}
          />
        ))}
      </div>
      <div>
        <button
          className="px-6 py-3 mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={onClickRestart}
        >
          Reinicia
        </button>
      </div>
    </div>
  );
}

export default App;
