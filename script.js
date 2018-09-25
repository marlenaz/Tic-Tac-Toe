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
      board,
      //Functions
      renderBoard,
      startGame
  };
})();

//-----Game flow function--------------------------------------------------//
const gameFlow = (() => {
  //functions
    //---changing marks from o to x---//
      const playersTurns = () => {
          board.addEventListener("mouseover", () => {
            if (player1.nextMove === true) {
              player1.makeMove(player1, player2);
            } else {
              player2.makeMove(player2, player1);
            }
          });
      }

  return { /*firstTurn,*/ playersTurns };
})();

//-----Player objects --------------------------------------------------------//
const Player = (name, mark) => {
  //Variables
      let nextMove = true;
  //Functions
    //---putting players mark on the board---//
      const makeMove = (playerObj, nextPlayerObj) => {
          const markSpace = document.querySelectorAll(".board");
          markSpace.forEach((space) => {
            if (space.textContent === "") {
              space.addEventListener("click", () => {
              space.textContent = mark;
              let comment = document.getElementById("comment");
              comment.textContent = name + " made his move!";
              playerObj.nextMove = false;
              nextPlayerObj.nextMove = true;
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
gameFlow.playersTurns();
//umiescic funkcje w funkcjach
console.log(player1);
console.log(player2);
