
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const newGameBtn = document.getElementById('new-game-btn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => !gameBoard.includes('');

    const showResultScreen = (message) => {
        resultMessage.textContent = message;
        resultScreen.style.display = 'flex';
    };

    const handleClick = (index) => {
        if (gameBoard[index] || !gameActive) {
            return;
        }

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        if (checkWinner()) {
            showResultScreen(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (checkDraw()) {
            showResultScreen('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const resetGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        gameActive = true;
        resultScreen.style.display = 'none';
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });

    newGameBtn.addEventListener('click', resetGame);
});
