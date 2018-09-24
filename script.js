const gameboard = (() => {
  //Functions and variables
  const board = ["X", "X", "X", "X", "X", "X","X", "X", "X"];
  return {
    board
  };
})();

const gameFlow = (() => {
  //Start gameFlow
  const renderBoard = () => {
    const boardPattern = ["X", "O", "X", "O", "X", "O","X", "O", "X"];
    const board = document.getElementById("board");
    boardPattern.forEach((mark) => {
      const boardPiece = document.createElement("div");
      board.appendChild(boardPiece);
      boardPiece.textContent = mark;
    })
  }

  const startNewGame; //function that starts the game after clicking on button

  return {
    renderBoard
  };
})();

const Player = (name, mark) => {
  //Functions
  return { name, mark };
};
const player1 = Player("player1", "O");
const layer2 = Player("player2", "X");
//Game
gameFlow.renderBoard();
