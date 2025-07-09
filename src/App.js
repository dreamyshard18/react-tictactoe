import { useState } from 'react';

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = ({ isXNext, board, onMove }) => {
  const handleClick = (index) => {
    if (getWinner(board) || board[index]) return;

    const nextBoard = [...board];
    nextBoard[index] = isXNext ? 'X' : 'O';
    onMove(nextBoard);
  };

  const winner = getWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="status">{status}</div>
      {[0, 3, 6].map((start) => (
        <div className="board-row" key={start}>
          {[0, 1, 2].map((offset) => {
            const index = start + offset;
            return (
              <Square
                key={index}
                value={board[index]}
                onClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleMove = (nextBoard) => {
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game-container">
      <div className="title">Tic-Tac-Toe!</div>
      <div className="game">
        <div className="game-board">
          <Board isXNext={isXNext} board={board} onMove={handleMove} />
      </div>
      <div className="game-info">
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  </div>
);

  
};

const getWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],           // diagonals
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default Game;
