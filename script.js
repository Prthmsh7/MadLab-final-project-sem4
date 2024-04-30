document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const statusDisplay = document.getElementById("status");
  const restartButton = document.getElementById("restart-btn");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }

  function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
  }

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
      const winCondition = winningCombinations[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      statusDisplay.innerHTML = "It's a draw!";
      gameActive = false;
      return;
    }

    handlePlayerChange();
  }

  function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
  }

  function handleRestartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  }

  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  restartButton.addEventListener("click", handleRestartGame);
});
