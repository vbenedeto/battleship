import { ship } from "./ship";

describe("ship", () => {
  let shipObj;

  beforeEach(() => {
    shipObj = ship(3);
  });

  test('returns a Ship object', () => {
    expect(typeof ship()).toBe('object');
  });
  
  test('Ship object contains length property', () => {
    expect(shipObj.length).toBe(3);
  });

  test('Ship object starts with 0 hits', () => {
    expect(shipObj.hitsNumber).toBe(0);
  });

  test('hit() increases the number of Ship hits', () => {
    shipObj.hit();
    expect(shipObj.hitsNumber).toBe(1);
  });

  test('isSunk() returns true when hits equal length', () => {
    shipObj.hit();
    shipObj.hit();
    shipObj.hit();
    expect(shipObj.isSunk()).toBe(true);
  });

   test('isSunk() returns false when not enough hits', () => {
    shipObj.hit();
    expect(shipObj.isSunk()).toBe(false);
  });
})

/*
Ship factory tests:
  - object creation
  - length property
  - hit tracking
  - isSunk calculation
*/