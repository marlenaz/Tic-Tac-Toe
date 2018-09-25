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
        markSpace.forEach((space) => space.textContent = "");
      })
  }
  return {
      //Functions
      renderBoard,
      startGame
  };
})();

//-----Game flow function--------------------------------------------------//
const gameFlow = (() => {
  //functions
      const firstTurn = () => {
          const startButton = document.getElementById("start");
          startButton.addEventListener("click", player1.makeMove);
      }

      const playerTurn = () => {

      }

  return { firstTurn };
})();

//-----Player objects --------------------------------------------------------//
const Player = (name, mark) => {
  //Variables
      let nextMove = true;
  //Functions
    //---putting players mark on the board---//
      const makeMove = () => {
          const markSpace = document.querySelectorAll(".board");
          markSpace.forEach((space) => {
            if (space.textContent === "") {
              space.addEventListener("click", () => {
              space.textContent = mark;
              let comment = document.getElementById("comment");
              comment.textContent = name + " made his move!";
              })
            }
          });
      }

  return { name, mark, nextMove, makeMove };
};
const player1 = Player("player1", "O");
const player2 = Player("player2", "X");


//-----Iitializing game-----------------------------------------------------//
gameboard.renderBoard();
gameboard.startGame();
gameFlow.firstTurn();
console.log(player1);
