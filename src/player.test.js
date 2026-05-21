import { player } from "./player.js";

describe('Player', () => {
  let playerObj;

  beforeEach(() => {
    playerObj = player('human');
  })

  test('player() returns an obj', () => {
    expect(typeof playerObj).toBe('object');
  });

  test('player() has a type property', () => {
    expect(playerObj.type).toBe('human');
  })

  test('player() has its own gameboard', () => {
    expect(playerObj.board).toBeDefined();
  });

  test('computerAttack() makes a random attack into the board from the human player', () => {
    const computerPlayer = player('computer');
    computerPlayer.computerAttack(playerObj.board);

    expect(playerObj.board.missedAttacks.length).toBe(1);
  })

  test('computerAttack() never attacks the same coordinate twice', () => {
    const computerPlayer = player('computer');
    for (let i = 0; i < 10; i++) {
      computerPlayer.computerAttack(playerObj.board);
    }

    expect(playerObj.board.missedAttacks.length).toBe(10);
  });
});