const Player = (letter) => {
  this.letter = letter;

  const getLetter = () => {
    return letter;
  };

  return { getLetter };
};

const gameBoard = (() => {
  const squares = document.querySelectorAll(".square");
  const restartBtn = document.querySelector(".restart");
  const message = document.querySelector(".message");
  const board = ["", "", "", "", "", "", "", "", ""];

  const setSquare = (index, letter) => {
    board[index] = letter;
  };

  const getSquare = (index) => {
    return board[index];
  };

  const getAiMoves = () => {
    let aiMoves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        aiMoves.push(i);
      }
    }
    return aiMoves;
  };

  const displayBoard = () => {
    for (let i = 0; i < board.length; i++) {
      squares[i].innerHTML = board[i];
    }
  };

  const updateMessage = (text) => {
    message.innerHTML = text;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    gamePlay.resetGame();
    displayBoard();
  };

  squares.forEach((square) => {
    square.addEventListener("click", (e) => {
      //dont allow an illegal move
      if (e.target.textContent !== "") {
        // TODO: make this prettier or remove
        alert("illegal move");
        return;
      }
      gamePlay.makeMove(e.target.getAttribute("data-set"));
      displayBoard();
    });
  });

  restartBtn.addEventListener("click", resetBoard);

  return { setSquare, getSquare, getAiMoves, updateMessage, resetBoard };
})();

const gamePlay = (() => {
  const player1 = Player("X");
  const player2 = Player("O");
  let round = 1;

  const currentPlayer = () => {
    if (round % 2 === 1) {
      gameBoard.updateMessage(`${player2.getLetter()}'s turn!`);
      return player1;
    } else {
      gameBoard.updateMessage(`${player1.getLetter()}'s turn!`);
      return player2;
    }
  };

  const aiMove = () => {
    const options = gameBoard.getAiMoves();
    const randomMove = options[Math.floor(Math.random() * options.length)];
    player = currentPlayer();
    gameBoard.setSquare(randomMove, player.getLetter());
    checkWin(player);
    console.log(options);
    console.log(randomMove);
    round++;
  };

  const makeMove = (index) => {
    const player = currentPlayer();
    gameBoard.setSquare(index, player.getLetter());
    checkWin(player);

    if (round === 9) {
      gameBoard.updateMessage("DRAW!");
      // gameBoard.resetBoard();
      round = 0;
    }
    round++;
    aiMove();
  };

  const checkWin = (player) => {
    const winningCombos = [
      [gameBoard.getSquare(0), gameBoard.getSquare(1), gameBoard.getSquare(2)],
      [gameBoard.getSquare(0), gameBoard.getSquare(4), gameBoard.getSquare(8)],
      [gameBoard.getSquare(0), gameBoard.getSquare(3), gameBoard.getSquare(6)],
      [gameBoard.getSquare(1), gameBoard.getSquare(4), gameBoard.getSquare(7)],
      [gameBoard.getSquare(2), gameBoard.getSquare(5), gameBoard.getSquare(8)],
      [gameBoard.getSquare(3), gameBoard.getSquare(4), gameBoard.getSquare(5)],
      [gameBoard.getSquare(2), gameBoard.getSquare(4), gameBoard.getSquare(6)],
      [gameBoard.getSquare(6), gameBoard.getSquare(7), gameBoard.getSquare(8)],
    ];

    winningCombos.forEach((combo) => {
      if (combo.every((pick) => pick == player.getLetter())) {
        gameBoard.updateMessage(`${player.getLetter()} has won!`);
        // gameBoard.resetBoard();
        round = 0;
      }
    });
  };

  const resetGame = () => {
    round = 1;
    gameBoard.updateMessage("X's turn!");
  };

  return { makeMove, currentPlayer, resetGame };
})();
