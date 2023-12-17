const board = document.getElementById('board');
  const status = document.getElementById('status');
  const restartButton = document.getElementById('restart');
  const resetScoresButton = document.getElementById('resetScores');
  const scoreXElement = document.getElementById('scoreX');
  const scoreOElement = document.getElementById('scoreO');
  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;
  let scoreX = 0;
  let scoreO = 0;

  // Carregar scores do armazenamento local
  if (localStorage.getItem('scoreX')) {
    scoreX = parseInt(localStorage.getItem('scoreX'));
    scoreXElement.textContent = scoreX;
  }

  if (localStorage.getItem('scoreO')) {
    scoreO = parseInt(localStorage.getItem('scoreO'));
    scoreOElement.textContent = scoreO;
  }

  function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = value;
      cell.addEventListener('click', () => handleCellClick(index));
      board.appendChild(cell);
    });
  }

  function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    renderBoard();
    
    if (checkWinner()) {
      status.textContent = `Jogador ${currentPlayer} venceu!`;
      updateScore();
      gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
      status.textContent = 'Empate!';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Vez do Jogador ${currentPlayer}`;
    }
  }

  function checkWinner() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
      [0, 4, 8], [2, 4, 6]             // diagonais
    ];

    return winningCombos.some(combo => {
      const [a, b, c] = combo;
      return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
  }

  function updateScore() {
    if (currentPlayer === 'X') {
      scoreX++;
      scoreXElement.textContent = scoreX;
      localStorage.setItem('scoreX', scoreX);
    } else {
      scoreO++;
      scoreOElement.textContent = scoreO;
      localStorage.setItem('scoreO', scoreO);
    }
  }

  function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = 'Vez do Jogador X';
    renderBoard();
  }

  function resetScores() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
    localStorage.setItem('scoreX', scoreX);
    localStorage.setItem('scoreO', scoreO);
  }

  restartButton.addEventListener('click', resetGame);
  resetScoresButton.addEventListener('click', resetScores);

  renderBoard();