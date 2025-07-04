const board = document.querySelector('#board')
const cells = document.querySelectorAll('.cell')        
const statusText = document.querySelector('#status')
const restart = document.querySelector('#restart')


let currentPlayer = 'X'
let gameOver = false


let boardState = ['', '', '', '', '', '', '', '', ''];


const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

function checkWinner() {
    for(const element of winningCombinations ) {
        const [a, b, c] = element;
        if(boardState[a]&& boardState[b] && boardState[a]=== boardState[b] && boardState[a]=== boardState[c]){
        return boardState[a]
    }
} return boardState.includes('') ? null : 'draw';
}

function handleClick(event){
    const cell = event.target;
    const index = cell.getAttribute('data-index');

  if(boardState[index]|| gameOver) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWinner();

    if(winner) {
        if(winner === 'draw') {
            statusText.textContent = "It's a draw!";
        } else {
            statusText.textContent = `${winner} wins!`;
        }
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}
function restartGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameOver = false;
  statusText.textContent = `${currentPlayer}'s turn`;
}
cells.forEach(cell => cell.addEventListener('click', handleClick));
restart.addEventListener('click', restartGame);

statusText.textContent = `${currentPlayer}'s turn`; 