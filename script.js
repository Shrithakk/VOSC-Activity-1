const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (cell.textContent !== "" || gameOver) {
            return;
        }

        cell.textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
            return;
        }

        if (checkDraw()) {
            statusText.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    });
});

function checkWinner() {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function checkDraw() {
    return [...cells].every((cell) => cell.textContent !== "");
}

restartButton.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameOver = false;
    statusText.textContent = "Player X's turn";
});
