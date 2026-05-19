const directions = {
  right: [0, 1],
  left: [0, -1],
  down: [1, 0],
  up: [-1, 0],
};

export const gameboard = () => {
  let missedAttacks = [];
  const ships = [];

  const createBoard = () => {
    const board = [];

    for (let row = 0; row < 10; row++) {
      board[row] = [];
      for (let col = 0; col < 10; col++) {
        board[row][col] = {
          ship: null,
          isAttacked: false
        };
      }
    }
    return board;
  }
  const board = createBoard();

  const isCoorValid = (row, col) => {
    if (row < 0 || col < 0 || row > 9 || col > 9) return false;
    if (board[row][col].ship !== null) return false;
    return true;    
  }

  const placeShip = (ship, coor, direction) => {
    const [rowDir, colDir] = directions[direction];

    for (let i = 0; i < ship.length; i++) {
      const row = coor[0] + (rowDir * i); 
      const col = coor[1] + (colDir * i);
      if (!isCoorValid(row, col)) {
        throw new Error("Invalid coordinate");
      }
    }

    for (let i = 0; i < ship.length; i++) {
      board[coor[0] + (rowDir * i)][coor[1] + (colDir * i)].ship = ship;
    }

    ships.push(ship);
  };

  const receiveAttack = (coor) => {
    if (board[coor[0]][coor[1]].isAttacked) {
      throw new Error("This area has been hit already!");
    }

    if (board[coor[0]][coor[1]].ship !== null) {
      board[coor[0]][coor[1]].ship.hit();
    } else {
      missedAttacks.push(coor);
    }
    board[coor[0]][coor[1]].isAttacked = true;
  }

  const checkShipsSunkState = () => ships.every(ship => ship.isSunk());

  return {
    board,
    placeShip,
    receiveAttack,
    missedAttacks,
    checkShipsSunkState,
  }
}
