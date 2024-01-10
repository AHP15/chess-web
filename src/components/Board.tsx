import React, { useEffect, useState } from 'react';

import initialPieces, {
  PieceType,
  Pieces,
  promotionPiecesForBlack,
  promotionPiecesForWhite
} from '../../gameLogic/initialPieces';
import getMatrix from '../../gameLogic/board';
import Square, { OperationTypeAfterSquareClick, PieceTypeWithPublicName } from './Square';
import { PossibleSquare } from '../../gameLogic/utils';

import styles from '../styles/Board.module.css';
import Promotion from './Promotion';

export type Game = {
  id: string,
  player: string,
  pieces: Pieces,
  possibleSquares: PossibleSquare[],
  selectedPiece: PieceTypeWithPublicName | null,
  lastAction: OperationTypeAfterSquareClick,
  enpassant: boolean,
  promotionPieces: (string | PieceType)[][],
  showPromotions: boolean
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
    promotionPieces: player === 'white' ? [...promotionPiecesForWhite.entries()] : [...promotionPiecesForBlack.entries()],
    showPromotions: false,
  });

  useEffect(() => {

    let promotionAvailable = false;
    [...game.pieces.values()].forEach((piece: PieceType) => {
      if (game.player === 'white' && piece.name === 'WP' && piece.y === 7) {
        promotionAvailable = true;
      }
      else if (game.player !== 'white' && piece.name === 'BP' && piece.y === 0) {
        promotionAvailable = true;
      }
    });

    if (promotionAvailable && !game.showPromotions) {
      setGame(prev => ({
        ...prev,
        showPromotions: true
      }));
    }
  }, [game]);

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
      {
        game.showPromotions && (
          <div className={styles.promotions}>
            {game.promotionPieces.map(([publicName, info]) => (
              <Promotion
                key={publicName as KeyType}
                piece={{ publicName: publicName as string, info: info as PieceType }}
                game={game}
                setGame={setGame}
              />
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Board;
