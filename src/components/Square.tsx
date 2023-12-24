import React from 'react';
import { Game } from './Board';
import { PieceType, Pieces } from '../../gameLogic/initialPieces';
import { SquareType } from '../../gameLogic/board';

import styles from '../styles/Board.module.css';


export type PieceTypeWithPublicName = {
  publicName: string,
  info: PieceType,
};

function getPiece(pieces: Pieces, square: SquareType): PieceTypeWithPublicName | null {
  for (const [k, v] of pieces.entries()) {
    if (v.x === square.x && v.y === square.y) {
      return {
        publicName: k,
        info: v,
      };
    }
  }
  return null;
}

type Props = {
  game: Game,
  square: SquareType,
};

const Square: React.FC<Props> = ({ game, square }) => {
  const piece: PieceTypeWithPublicName | null = getPiece(game.pieces, square);
  return (
    <div className={styles.square} style={{ backgroundColor: square.background }}>
      {piece && <p>{piece.publicName}</p>}
    </div>
  );
};

export default Square;
