const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = '1';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameState[index] !== '' || !isGameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        message.textContent = `It's a draw!`;
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === '1' ? '2' : '1';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer;
    });
}

function resetGame() {
    currentPlayer = '1';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

message.textContent = `Player ${currentPlayer}'s turn`;