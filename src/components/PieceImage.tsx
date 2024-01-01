
const PieceUniCode = ({ pieceName }: { pieceName: string }) => {
  let jsx;
  switch (pieceName) {
    case 'WP':
      jsx = <>&#9817;</>
      break;
    case 'WR':
      jsx = <>&#9814;</>
      break;
    case 'WB':
      jsx = <>&#9815;</>
      break;
    case 'WQ':
      jsx = <>&#9813;</>
      break;
    case 'WKG':
      jsx = <>&#9812;</>
      break;
    case 'WKN':
      jsx = <>&#9816;</>
      break;
    case 'BP':
      jsx = <>&#9823;</>
      break;
    case 'BR':
      jsx = <>&#9820;</>
      break;
    case 'BB':
      jsx = <>&#9821;</>
      break;
    case 'BQ':
      jsx = <>&#9819;</>
      break;
    case 'BKG':
      jsx = <>&#9818;</>
      break;
    case 'BKN':
      jsx = <>&#9822;</>
      break;
    default:
      jsx = <></>
  }

  return <p style={{ cursor: 'pointer' }}>{jsx}</p>;
}

export default PieceUniCode;
