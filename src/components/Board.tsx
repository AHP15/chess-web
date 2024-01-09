import React, { useState } from 'react';

import initialPieces, { Pieces } from '../../gameLogic/initialPieces';
import getMatrix from '../../gameLogic/board';
import Square, { OperationTypeAfterSquareClick, PieceTypeWithPublicName } from './Square';
import { PossibleSquare } from '../../gameLogic/utils';

import styles from '../styles/Board.module.css';

export type Game = {
  id: string,
  player: string,
  pieces: Pieces,
  possibleSquares: PossibleSquare[],
  selectedPiece: PieceTypeWithPublicName | null,
  lastAction: OperationTypeAfterSquareClick,
  enpassant: boolean
};

const Board: React.FC<{ player: string }> = ({ player }) => {
  const [game, setGame] = useState<Game>({
    id: Math.random().toLocaleString(),
    player,
    pieces: initialPieces,
    possibleSquares: [],
    selectedPiece: null,
    lastAction: 'inprogress',
    enpassant: false,
  });

  return (
    <div data-testid={game.lastAction} className={styles[`${player === 'white' ? 'board' : 'flip_board'}`]}>
      {
        getMatrix().map(row => row.map(square => (
          <Square
            key={square.name}
            game={game}
            setGame={setGame}
            square={square}
          />
        )))
      }
    </div>
  );
};

export default Board;
