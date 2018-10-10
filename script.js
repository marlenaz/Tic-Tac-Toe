//------Game board function -------------------------------------------//
const gameboard = (() => {

    const board = document.getElementById("board");


         //----render first, visual board---//
    const renderBoard = () => {
        const startBoardArray = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
        startBoardArray.forEach((mark) => {
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
          gameFlow.playersTurns();
          gameFlow.checkWin();
        })
    }
    //---render the array of players marks on board---//
    const gameBoardArray = () => {
         let boardArr = [];
         const markSpace = document.querySelectorAll(".board");
         markSpace.forEach((space) => boardArr.push(space.textContent));
         return boardArr;
    }

  return {
      board,
      //Functions
      renderBoard,
      startGame,
      gameBoardArray
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

        //---sprawdza czy jest win---//
      const playerWon = () => {
        const pattern = [
                          [0, 1, 2],
                          [3, 4, 5],
                          [6, 7, 8],
                          [0, 3, 6],
                          [1, 4, 7],
                          [2, 5, 8],
                          [0, 4, 8],
                          [2, 4, 6]
                        ];
          let markArr =  gameboard.gameBoardArray();
          let comment = document.getElementById("comment");
          let x =[];
          let y =[];
          for (let i = 0; i < markArr.length; i++) {
            if (markArr[i] === "O") {
              x.push(i); ///[0, 2, 4, 8]
            } else if (markArr[i] === "X") {
              y.push(i);
            }
          }
          for(let j = 0; j < pattern.length; j++) {
            if (x.indexOf(pattern[j][0]) !== -1 &&
                x.indexOf(pattern[j][1]) !== -1 &&
                x.indexOf(pattern[j][2]) !== -1) {
                  comment.textContent = "PLAYER 1 WON!";
                  endGame();
              } else if (y.indexOf(pattern[j][0]) !== -1 &&
                         y.indexOf(pattern[j][1]) !== -1 &&
                         y.indexOf(pattern[j][2]) !== -1) {
                           comment.textContent = "PLAYER 2 WON!";
                           endGame();
              } else if ((x.indexOf(pattern[j][0]) === -1 ||
                      x.indexOf(pattern[j][1]) === -1 ||
                      x.indexOf(pattern[j][3]) === -1) &&
                      markArr.indexOf("I") === -1 &&
                       markArr.indexOf("") === -1) {
                comment.textContent = "IT'S A TIE!";
            }
          }
      }

      //--uruchamia sprawdzani czy jest win---/
      const checkWin = () => {
          const markSpace = document.querySelectorAll(".board");
          markSpace.forEach((space) => {
            space.addEventListener("mousemove", () => {
              playerWon();
            })
          })
      }

      const endGame = () => {
          const markSpace = document.querySelectorAll(".board");
          markSpace.forEach((spaces) => {
            if (spaces.textContent === "") {
              spaces.textContent = "I";
            }
          });
      }



  return { playersTurns, checkWin };
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
              comment.textContent = name + " made his move! Time for next player";
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
//end game different way
