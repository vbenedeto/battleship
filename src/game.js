import { player } from "./player"
import { ship } from "./ship"; 

export const game = () => {
  const userPlayer = player('human');
  const computerPlayer = player('computer');
  let currentPlayer = userPlayer;

  const setupBoard = (board) => {
    board.placeShip(ship(5), [0, 0], 'right'); // Carrier
    board.placeShip(ship(4), [2, 0], 'right');  
    // Battleship ^
    board.placeShip(ship(3), [4, 0], 'right'); 
    // Destroyer ^
    board.placeShip(ship(3), [6, 0], 'right');
    // Submarine
    board.placeShip(ship(2), [8, 0], 'right');
    // Patrol Boat
  }
  setupBoard(userPlayer.board);
  setupBoard(computerPlayer.board);

  const switchTurn = () => {
    currentPlayer = currentPlayer === userPlayer ? computerPlayer : userPlayer;
  }

  const checkGameOver = () => {
    if (userPlayer.board.checkShipsSunkState()) return computerPlayer;
    if (computerPlayer.board.checkShipsSunkState()) return userPlayer;

    return null;
  }

  return {
    userPlayer,
    computerPlayer,
    switchTurn,
    getCurrentPlayer: () => currentPlayer,
    checkGameOver,
  }
}