//------Game board function -------------------------------------------//
const gameboard = (() => {

    //----render first, visual board---//
    const renderBoard = () => {
        const startBoardArray = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
        const board = document.getElementById("board");
        startBoardArray.forEach((mark) => {
          const boardPiece = document.createElement("div");
          board.appendChild(boardPiece);
          boardPiece.setAttribute("class", "board");
          boardPiece.textContent = mark;
        })
    }

    //----delete visual content of the borad, starts game---//
    const startGame = () => {
        const startButton = document.getElementById("start");
        const markSpace = document.querySelectorAll(".board");
        startButton.addEventListener("click", () => {
          gameFlow.roundOver = true;
          gameFlow.winner = "";
          markSpace.forEach((space) => space.textContent = "");
          if (gameFlow.playersTurnsEnabled === false) {
              gameFlow.playersTurns();
            }
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
      renderBoard,
      startGame,
      gameBoardArray
  };
})();

//-----Game flow function--------------------------------------------------//
const gameFlow = (() => {
     let winner = "";
     let pointsO = 0;
     let pointsX = 0;
     let roundOver = true;
     let playersTurnsEnabled = false;

      //---changing marks from o to x---//
      const playersTurns = () => {
          gameFlow.playersTurnsEnabled = true;
          const boardWindow = document.querySelector(".gameboard");
          boardWindow.addEventListener("click", () => {
            if (player1.nextMove === true) {
              player1.makeMove(player1, player2);
            } else {
              player2.makeMove(player2, player1);
            }
          });
      }

        //---O/X win-chceck---//
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
                x.push(i);
              } else if (markArr[i] === "X") {
                y.push(i);
              }
            }

            for(let j = 0; j < pattern.length; j++) {

                    if (x.indexOf(pattern[j][0]) !== -1 &&
                        x.indexOf(pattern[j][1]) !== -1 &&
                        x.indexOf(pattern[j][2]) !== -1) {
                          comment.textContent = "PLAYER 1 WON!";
                          gameFlow.winner = "O";
                          endGame();
                }
                else if (y.indexOf(pattern[j][0]) !== -1 &&
                         y.indexOf(pattern[j][1]) !== -1 &&
                         y.indexOf(pattern[j][2]) !== -1) {
                           comment.textContent = "PLAYER 2 WON!";
                           gameFlow.winner = "X";
                           endGame();
                }
            }

            if (gameFlow.winner === "" &&
                markArr.indexOf("*") === -1 &&
                markArr.indexOf("") === -1) {
                  comment.textContent = "IT'S A TIE!";
                  gameFlow.winner = "Tie";
                  endGame();
           }
      }

      //---Ending possibility to put marks---//
      const endGame = () => {
          const spaces = document.querySelectorAll(".board");
          spaces.forEach(space => {
            if (space.textContent === "") {
              space.textContent = "*";
            }
          })
          const startButton = document.getElementById("start");
          startButton.textContent = "NEXT ROUND";
          points();
      }

      //---point counter---//
      const points = () => {
          const scoreO = document.getElementById("1");
          const scoreX = document.getElementById("2");

          if (gameFlow.roundOver === true) {
              if (gameFlow.winner === "O") {
                pointsO += 1;
              }
              else if (gameFlow.winner === "X") {
                pointsX += 1;
              }
              else if (gameFlow.winner === "Tie") {
                pointsO += 1;
                pointsX += 1;
              }
           }
           gameFlow.roundOver = false;
           scoreO.textContent = pointsO;
           scoreX.textContent = pointsX;
      }

  return { playersTurns, playerWon, winner, roundOver, playersTurnsEnabled };
})();

//-----Player objects --------------------------------------------------------//
const Player = (name, mark) => {
      let nextMove = true;

      //---putting players mark on the board---//
      const makeMove = (playerObj, nextPlayerObj) => {
          gameFlow.playerWon();
          console.log("THIS");
          const markSpace = document.querySelectorAll(".board");
          markSpace.forEach((space) => {
            if (space.textContent === "") {
              space.addEventListener("click", () => {
                if (space.textContent !== "*") {
                space.textContent = mark;
                }
                let comment = document.getElementById("comment");
                comment.textContent = `Time for Player [${nextPlayerObj.mark}]`;
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
