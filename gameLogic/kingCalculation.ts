import { PieceType, Pieces } from './initialPieces';
import { Condition, Effect, PossibleSquare, squareInfo } from './utils';

function pieceInSquare(square: PossibleSquare, pieces: Pieces): PieceType | null {
  let data: PieceType | null = null;
  for (const piece of pieces.values()) {
    if (piece.x === square.x && piece.y === square.y) {
      data = piece;
    }
  }
  return data;
}

function traverseChessLineForCheck(
  piece: PieceType,
  pieces: Pieces,
  condition: Condition,
  effectX: Effect,
  effectY: Effect,
  checkAgainst: string[]
) {
  let square: PossibleSquare;
  let { x: X, y: Y } = piece;
  while (condition(X, Y)) {
    X = effectX(X);
    Y = effectY(Y);
    square = { x: X, y: Y };

    const piece = pieceInSquare(square, pieces);
    if (piece && checkAgainst.indexOf(piece.name) !== -1) {
      return true
    } else if (piece) {
      break;
    }
  }
  return false;
}

const WHITE_COLOR = 'white';
export function isKingInCheck(king: PieceType, pieces: Pieces): boolean {
  // check if king is attacked by a pawn
  // for pawn we should test two squares
  const isWhite = king.color === WHITE_COLOR;
  const square1 = {
    x: isWhite ? king.x + 1 : king.x - 1,
    y: isWhite ? king.y + 1 : king.y - 1
  };
  const square2 = {
    x: isWhite ? king.x - 1 : king.x + 1,
    y: isWhite ? king.y + 1 : king.y - 1
  };
  const piece1 = pieceInSquare(square1, pieces);
  const piece2 = pieceInSquare(square2, pieces);

  if ((isWhite && piece1?.name == 'BP') || (!isWhite && piece1?.name == 'WP')) {
    return true;
  }

  if ((isWhite && piece2?.name == 'BP') || (!isWhite && piece2?.name == 'WP')) {
    return true;
  }




  // check if king is attacked by queen or rook
  const attackedByQueenOrRook = {
    white: ['WQ', 'WR'],// white queen or white rook
    black: ['BQ', 'BR'],// black queen or black rook
  };
  const checkVerticalLineToTop = traverseChessLineForCheck(
    king,
    pieces,
    (x, y) => x <= 7 && y <= 7,
    x => x,
    y => ++y,
    isWhite ? attackedByQueenOrRook.black : attackedByQueenOrRook.white
  );

  const checkVerticalLineToBottom = traverseChessLineForCheck(
    king,
    pieces,
    (x, y) => x <= 7 && y >= 0,
    x => x,
    y => --y,
    isWhite ? attackedByQueenOrRook.black : attackedByQueenOrRook.white
  );

  const checkHorizontalLineToLeft = traverseChessLineForCheck(
    king,
    pieces,
    (x, y) => x >= 0 && y <= 7,
    x => --x,
    y => y,
    isWhite ? attackedByQueenOrRook.black : attackedByQueenOrRook.white
  );

  const checkHorizontalLineToRight = traverseChessLineForCheck(
    king,
    pieces,
    (x, y) => x <= 7 && y <= 7,
    x => ++x,
    y => y,
    isWhite ? attackedByQueenOrRook.black : attackedByQueenOrRook.white
  );
  if (checkVerticalLineToTop || checkVerticalLineToBottom
    || checkHorizontalLineToLeft || checkHorizontalLineToRight) {
    return true;
  }



  // check if king is attacked by queen or bihsop
  const attackedByQueenOrBishop = {
    white: ['WQ', 'WB'],// white queen or white bishop
    black: ['BQ', 'BB'],// black queen or black bishop
  };
  const checkLineToRightTop = traverseChessLineForCheck(
    king,
    pieces,
    (x, y) => x <= 7 && y <= 7,
    x => ++x,
    y => ++y,
    isWhite ? attackedByQueenOrBishop.black : attackedByQueenOrBishop.white
  );

  const checkLineToLeftBottom = traverseChessLineForCheck(
    king,
    pieces,
    (x, y) => x >= 0 && y >= 0,
    x => --x,
    y => --y,
    isWhite ? attackedByQueenOrBishop.black : attackedByQueenOrBishop.white
  );

  const checkLineToLeftTop = traverseChessLineForCheck(
    king,
    pieces,
    (x, y) => x >= 0 && y <= 7,
    x => --x,
    y => ++y,
    isWhite ? attackedByQueenOrBishop.black : attackedByQueenOrBishop.white
  );

  const checkLineToRightBottom = traverseChessLineForCheck(
    king,
    pieces,
    (x, y) => x <= 7 && y >= 0,
    x => ++x,
    y => --y,
    isWhite ? attackedByQueenOrBishop.black : attackedByQueenOrBishop.white
  );
  if (checkLineToRightTop || checkLineToLeftBottom
    || checkLineToLeftTop || checkLineToRightBottom) {
    return true;
  }



  // check if king is attacked by knight
  const X = king.x;
  const Y = king.y;
  const allPositions = [
    { x: X + 1, y: Y + 2 },
    { x: X - 1, y: Y + 2 },
    { x: X + 1, y: Y - 2 },
    { x: X - 1, y: Y - 2 },
    { x: X + 2, y: Y + 1 },
    { x: X - 2, y: Y + 1 },
    { x: X + 2, y: Y - 1 },
    { x: X - 2, y: Y - 1 },
  ];

  let attackedByKnight = false;
  allPositions.forEach(position => {
    const piece = pieceInSquare(position, pieces);
    if ((isWhite && piece?.name == 'BKN') || (!isWhite && piece1?.name == 'WKN')) {
      attackedByKnight = true;
    }
  });

  return attackedByKnight;
}

export default function calculatePossibleMovesForKing(piece: PieceType, pieces: Pieces): PossibleSquare[] {
  const { x: X, y: Y } = piece;
  const moves: PossibleSquare[] = [];
  const allPossitions = [
    { x: X, y: Y + 1 },
    { x: X + 1, y: Y + 1 },
    { x: X - 1, y: Y + 1 },
    { x: X, y: Y - 1 },
    { x: X + 1, y: Y - 1 },
    { x: X - 1, y: Y - 1 },
    { x: X + 1, y: Y },
    { x: X - 1, y: Y }
  ];

  allPossitions.forEach(({ x, y }) => {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;

    const { freeSquare, capturingPossible } = squareInfo({ x, y }, piece.color, pieces);
    if (freeSquare || capturingPossible) {
      moves.push({ x, y });
    }
  });
  return moves;
}