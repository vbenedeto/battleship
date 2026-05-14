
export const ship = (length) => {
  return {
    length,
    hitsNumber: 0,
    hit() {
      this.hitsNumber++
    },
    isSunk() {
      return this.hitsNumber >= this.length;
    }
  };
}