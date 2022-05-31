const game = (() => {
  /* GameBoard */
  const gameBoard = (() => {
    const board = [
     '', '', '',
     '', '', '',
     '', '', ''
    ];

    const getBoard = () => board;

    const clearBoard = () => {
      board.fill('');
    };

    const updateBoard = (td) => {
      const index = tableCells.findIndex(el => el == td);
      board[index] = playerTurn;
    };

    return {
      getBoard,
      clearBoard,
      updateBoard,
    };
  })();

  /* Player Factory */
  const Player = (symbol) => {
    return { symbol }
  };

  /* Display Controller */
  const displayController = (() => {
    const displayBoard = () => {
      if ([...table.classList].includes('table--inactive')) {
        table.classList.remove('table--inactive');
      }

      gameBoard.getBoard().forEach((move, i) => {
        tableCells[i].textContent = move
      });
    }

    const updateButton = () => {
      const button = document.querySelector('button');
      button.textContent = 'Restart Game';
    };

    return {
      displayBoard,
      updateButton,
    };
  })();

  const tableCells = [...document.querySelectorAll('td')];
  const table = document.querySelector('table');
  let playerTurn = null;

  const init = () => {
    console.log('start game');
    gameBoard.clearBoard();
    displayController.displayBoard();
    displayController.updateButton();
    setListeners();
    playerTurn = 'X';

    const player1 = Player('X');
    const player2 = Player('O');
  };

  const setMove = ({ target }) => {
    if (target.nodeName == 'TD' && !target.textContent) {
      gameBoard.updateBoard(target);
      displayController.displayBoard();
      playerTurn = playerTurn == 'X' ? 'O' : 'X';
    }
  };

  const setListeners = () => {
    table.addEventListener('click', setMove);
  };

  return { init };
})();

document.querySelector('button').addEventListener('click', game.init);