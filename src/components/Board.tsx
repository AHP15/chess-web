import React, { useState } from 'react';

import initialPieces, { Pieces } from '../../gameLogic/initialPieces';
import getMatrix from '../../gameLogic/board';
import Square from './Square';

import styles from '../styles/Board.module.css';

export type Game = {
  id: string,
  player: string,
  pieces: Pieces,
};

const Board: React.FC<{ player: string }> = ({ player }) => {
  const [game,] = useState<Game>({
    id: Math.random().toLocaleString(),
    player,
    pieces: initialPieces
  });

  return (
    <div className={styles.board}>
      {
        getMatrix().map(row => row.map(square => (
          <Square
            key={square.name}
            game={game}
            square={square}
          />
        )))
      }
    </div>
  );
};

export default Board;
