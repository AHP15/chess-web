import React from 'react';
import { Game } from './Board';
import { PieceType, Pieces } from '../../gameLogic/initialPieces';
import { SquareType } from '../../gameLogic/board';
import { PossibleSquare } from '../../gameLogic/utils';
import calculatePossibleSquares from '../../gameLogic/possibleSquares';
import movePiece from '../../gameLogic/movePiece';

import styles from '../styles/Board.module.css';
import PieceUniCode from './PieceImage';


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

function isPossibleSquare(possibleSquares: PossibleSquare[], square: SquareType): boolean {
  for (const squarePosition of possibleSquares) {
    if (squarePosition?.x === square.x && squarePosition?.y === square.y) {
      return true;
    }
  }
  return false;
}

export type OperationTypeAfterSquareClick = 'inprogress' | 'clear' | 'move' | 'calculate';

type Props = {
  game: Game,
  setGame: React.Dispatch<React.SetStateAction<Game>>,
  square: SquareType,
};

const Square: React.FC<Props> = ({ game, setGame, square }) => {
  const piece: PieceTypeWithPublicName | null = getPiece(game.pieces, square);
  const possibleSquare = isPossibleSquare(game.possibleSquares, square);

  /**
   * When a square is clicked, we have the following cases:
   * 
   * 1.   square is empty
   * 1.1. case 1 and one piece is selected and clicked square is not a possible square
   * 1.2. case 1, one piece is selected, and the current square is a possible square (from previeus click)
   * 
   * 2.   square has a piece
   * 2.1. case 2 and the piece is from the current player (they have the same color)
   * 2.2. case 2 and the piece is from the opponent (they have different colors)
   * 2.2.1. case 2, and a piece is selected and is not a possible square
   * 2.2.2. case 2, and a piece is selected, and is a possible square (from previeus click)
   */
  const handleClick = () => {

    const clear = () => {
      setGame(prev => ({
        ...prev,
        possibleSquares: [],
        selectedPiece: null,
        lastAction: 'clear',
      }));
    };

    // case 1
    if (!piece) {
      // case 1.1
      if (game.selectedPiece && !possibleSquare) {
        // clear selected piece & possible squares
        clear();
      }

      // case 1.2
      if (game.selectedPiece && possibleSquare) {
        // move piece
        setGame(prev => ({
          ...prev,
          pieces: movePiece(game.pieces, game.selectedPiece as PieceTypeWithPublicName, square),
          possibleSquares: [],
          selectedPiece: null,
          lastAction: 'move',
        }));
      }

      // case 2
    } else {
      // case 2.1
      if (piece.info.color === game.player) {
        // calculate possible squares
        setGame(prev => ({
          ...prev,
          possibleSquares: calculatePossibleSquares(game.pieces, piece),
          selectedPiece: piece,
          lastAction: 'calculate',
        }));

        // case 2.2
      } else {
        // case 2.2.1
        if (game.selectedPiece && !possibleSquare) {
          // clear selected piece & possible squares
          clear();
        }

        // case 2.2.2
        if (game.selectedPiece && possibleSquare) {
          // move piece
          setGame(prev => ({
            ...prev,
            pieces: movePiece(game.pieces, game.selectedPiece as PieceTypeWithPublicName, square),
            possibleSquares: [],
            selectedPiece: null,
            lastAction: 'move',
          }));
        }
      }
    }
  };
  return (
    <div
      className={styles.square}
      style={{
        backgroundColor: square.background,
      }}
      onClick={handleClick}
      title={square.name}
    >
      {piece &&
        <PieceUniCode pieceName={piece.info.name} />
      }
      {possibleSquare && <p className={styles[`${piece ? 'capture_square' : 'possible_square'}`]}></p>}
      {square.x === 0 &&
        <p style={{ color: square.background === 'white' ? 'green' : 'white' }} className={styles.square_num}>
          {square.name.charAt(1).toLocaleLowerCase()}
        </p>
      }
      {square.y === 0 &&
        <p style={{ color: square.background === 'white' ? 'green' : 'white' }} className={styles.square_char}>
          {square.name.charAt(0).toLocaleLowerCase()}
        </p>
      }
    </div>
  );
};

export default Square;
