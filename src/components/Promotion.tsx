import { promote } from '../../gameLogic/utils';
import { Game } from './Board';
import PieceUniCode from './PieceImage';
import { PieceTypeWithPublicName } from './Square';
import styles from '../styles/Board.module.css';

type Props = {
  game: Game,
  setGame: React.Dispatch<React.SetStateAction<Game>>,
  piece: PieceTypeWithPublicName
};

const Promotion: React.FC<Props> = ({ game, setGame, piece }) => {
  const handleClick = () => {
    setGame(prev => ({
      ...prev,
      pieces: promote(game.pieces, piece),
      showPromotions: false
    }));
  };
  return (
    <div
      onClick={handleClick}
      className={styles.promotion_square}
    >
      <PieceUniCode pieceName={piece.info.name} player={game.player} />
    </div>
  );
};

export default Promotion;
