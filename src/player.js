import { gameboard } from "./gameboard"

export const player = (type) => {
  const board = gameboard();
  
  const computerAttack = (enemyBoard) => {
    while (true) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      if (!enemyBoard.board[row][col].isAttacked) {
        enemyBoard.receiveAttack([row, col]);
        break;
      }
    }
  }

  return {
    type, 
    board,
    computerAttack
  }
}

