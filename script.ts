const cells = document.querySelectorAll<HTMLButtonElement>(".cell");
const status = document.getElementById("status") as HTMLParagraphElement;
const restartButton = document.getElementById("restart") as HTMLButtonElement;

let board: string[] = ["", "", "", "", "", "", "", "", ""];
let currentPlayer: string = "X";
let gameOver: boolean = false;

const winningCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner(): boolean {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return true;
        }
    }

    return false;
}

function checkDraw(): boolean {
    return board.every(cell => cell !== "");
}

function handleCellClick(event: MouseEvent): void {
    if (gameOver) {
        return;
    }

    const cell = event.target as HTMLButtonElement;
    const index = Number(cell.dataset.index);

    if (board[index] !== "") {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        return;
    }

    if (checkDraw()) {
        status.textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame(): void {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    status.textContent = "Player X's turn";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
