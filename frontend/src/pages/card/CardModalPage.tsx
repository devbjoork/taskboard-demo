import { useParams } from 'react-router-dom';

import CardModal from '@/components/card/CardModal/CardModal';
import { BoardIdContext } from '@/contexts/BoardIdContext';
import { CardIdContext } from '@/contexts/CardIdContext';

export const CardModalPage: React.FC = () => {
  const params = useParams();
  const cardId = params.cardId || '';
  const boardId = params.boardId || '';
  return (
    <>
      <BoardIdContext.Provider value={boardId}>
        <CardIdContext.Provider value={cardId}>
          <CardModal />
        </CardIdContext.Provider>
      </BoardIdContext.Provider>
    </>
  );
};
