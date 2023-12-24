
export type SquareType = {
  name: string,
  x: number,
  y: number,
  background: string,
};

type Row = SquareType[];

// this function returns a matrix of 8x8 squares
// that's going to be used to render the chess board
// each square has a name, x and y coordinates and a background color
export default function getMatrix(): Row[] {
  const matrix: Row[] = [];
  const letters = "ABCDEFGH";
  let squareName: string;
  let value: string;

  for (let i = 0; i < 8; i++) {
    const row: Row = [];
    for (let j = 0; j < 8; j++) {
      squareName = letters[j];

      // square with coordinates that are both even or odd will be white otherwise it will be black
      // why is this? : this is just a pattren I noticed when I was looking at the chess board
      value = ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0))
        ? "rgb(162, 99, 16)"
        : "lightgreen";

      row.push({
        name: `${squareName}${i + 1}`,
        x: j,
        y: i,
        background: value,
      })
    }

    matrix.unshift(row);
  }

  return matrix;
}