import { ship } from "./ship";
import { gameboard } from "./gameboard.js";

describe('Gameboard', () => {
  let board;

  beforeEach(() => {
    board = gameboard();
  })

  test('Gameboard returns an object', () => {
    expect(typeof board).toBe('object');
  })

  test('placeShip() places a ship inside a board grid', () => {
    const shipObj = ship(3);
    board.placeShip(shipObj, [3, 4], 'down');

    expect(board.board[3][4].ship).toBe(shipObj);
    expect(board.board[4][4].ship).toBe(shipObj);
    expect(board.board[5][4].ship).toBe(shipObj);
  });

  test('placeShip() throws an error if coordinate is out of bounds', () => {
    const shipObj = ship(3);
    expect(() => board.placeShip(shipObj, [0, 8], 'right')).toThrow('Invalid coordinate');
  })

  test('placeShip() throws an error if coordinate is already taken', () => {
    const shipObj = ship(3);
    board.placeShip(shipObj, [0, 2], 'down');
    const shipObj2 = ship(2);
    expect(() => board.placeShip(shipObj2, [0,2], 'right')).toThrow('Invalid coordinate');
  })

  test('receiveAttack() increases hitsNumber of Ship obj', () => {
    const shipObj = ship(3);
    board.placeShip(shipObj, [6, 4], 'up');
    board.receiveAttack([5, 4]);
    expect(shipObj.hitsNumber).toEqual(1);
  })

  test('receiveAttack() tracks missed attacks', () => {
    board.receiveAttack([0, 0]);
    expect(board.missedAttacks).toContainEqual([0, 0]);
  });

  test('checkShipsSunkState() should return true if all the ships have been sunk', () => {
    const shipObj = ship(3);
    board.placeShip(shipObj, [0, 0], 'right');
    for (let i = 0; i < shipObj.length; i++) {
      board.receiveAttack([0, i]);
    }
    expect(board.checkShipsSunkState()).toBe(true);
  });

  test('checkShipsSunkState() returns false if not all ships are sunk', () => {
  const shipObj = ship(3);
  board.placeShip(shipObj, [0, 0], 'right');
  board.receiveAttack([0, 0]); 
  expect(board.checkShipsSunkState()).toBe(false);
});
});
