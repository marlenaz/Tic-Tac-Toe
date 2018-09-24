//------Game board function -------------------------------------------//
const gameboard = (() => {
  //Variables
  let boardArray = [];
  const board = document.getElementById("board");

  //Functions
       //----render first, visual board---//
  const renderBoard = () => {
      boardArray = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
      boardArray.forEach((mark) => {
        const boardPiece = document.createElement("div");
        board.appendChild(boardPiece);
        boardPiece.setAttribute("class", "board");
        boardPiece.textContent = mark;
      })
  }
      //----delete visual content of the borad, ready to players marks---//
  const startGame = () => {
      const startButton = document.getElementById("start");
      const markSpace = document.querySelectorAll(".board");
      startButton.addEventListener("click", () => {
        //on click - boardpiece textContent = ""
        markSpace.forEach((space) => space.textContent = "");
      })
  }
  return {
      renderBoard,
      startGame
  };
})();

//-----Game flow function--------------------------------------------------//
const gameFlow = (() => {
  //functions

  return {

  };
})();

//-----Player objects --------------------------------------------------------//
const Player = (name, mark) => {
  //Functions
  return { name, mark };
};
const player1 = Player("player1", "O");
const layer2 = Player("player2", "X");


//-----Iitializing game-----------------------------------------------------//
gameboard.renderBoard();
gameboard.startGame();
