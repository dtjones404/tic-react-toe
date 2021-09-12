import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 id="header">Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

function Board() {
  const reset = () => updateState(defaultState);

  const clickHandler = (rowNo, colNo) => {
    const boxNo = 3 * rowNo + colNo;
    if (state.board[boxNo]) return;

    updateState(({ board, isXTurn, winningSquares }) => {
      const newBoard = board.slice();
      const newWinningSquares = winningSquares.slice();
      newBoard[boxNo] = isXTurn ? 'X' : 'O';
      const winner = getWinner(newBoard);
      if (winner) winner.forEach((i) => (newWinningSquares[i] = true));
      return {
        board: newBoard,
        isXTurn: !isXTurn,
        winningSquares: newWinningSquares,
      };
    });
  };

  const getWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    for (const [x, y, z] of lines) {
      if (board[x] !== '' && board[x] === board[y] && board[y] === board[z])
        return [x, y, z];
    }
    return null;
  };

  const defaultState = {
    board: new Array(9).fill(''),
    isXTurn: true,
    winningSquares: new Array(9).fill(false),
  };
  const [state, updateState] = React.useState(defaultState);
  const rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push(
      <Row
        clickHandler={(colNo) => clickHandler(i, colNo)}
        rowVals={state.board.slice(3 * i, 3 * i + 3)}
        winningSquares={state.winningSquares.slice(3 * i, 3 * i + 3)}
      />
    );
  }
  return (
    <div>
      <div className="board">{rows}</div>
      <div id="resetButtonContainer">
        <button onClick={reset} id="resetButton">
          Reset
        </button>
      </div>
    </div>
  );
}

function Row({ clickHandler, rowVals, winningSquares }) {
  const boxes = [];
  for (let i = 0; i < 3; i++) {
    boxes.push(
      <Box
        clickHandler={() => clickHandler(i)}
        boxVal={rowVals[i]}
        isWinningSquare={winningSquares[i]}
      />
    );
  }
  return <div className="row">{boxes}</div>;
}

function Box({ clickHandler, boxVal, isWinningSquare }) {
  const boxClass = `box${isWinningSquare ? ' winner' : ''}`;
  return (
    <div>
      <button className={boxClass} onClick={clickHandler}>
        {boxVal}
      </button>
    </div>
  );
}

export default App;
