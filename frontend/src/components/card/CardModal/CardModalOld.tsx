// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import AppModal from '@/components/common/AppModal/AppModal';
// import { CardIdContext } from '@/contexts/CardIdContext';
// import { BoardIdContext } from '@/pages/board/BoardPage';
// import { useGetBoardByIdQuery } from '@/services/bff/boards.api';
// import { useDeleteCardMutation, useUpdateCardMutation } from '@/services/bff/cards.api';
// import { LabelState } from '@/services/bff/types';

// import CardLabelList from '../CardLabelList/CardLabelList';
// import CardLabelsButton from '../CardLabelsButton/CardLabelsButton';
// import CardParticipantList from '../CardParticipantList/CardParticipantList';
// import CardParticipantsButton from '../CardParticipantsButton/CardParticipantsButton';
// import {
//   CardBodyArea,
//   DeleteButton,
//   ModalContent,
//   ModalDetails,
//   ModalHeader,
//   ModalSection,
//   ModalSideBar,
//   ModalSubHeader,
//   SaveButton,
//   TitleInput,
// } from './CardModal.styled';

// interface CardModalProps {
//   // id: string;
//   // title: string;
//   // body: string;
//   // createdAt: Date;
//   // columnTitle: string;
//   activeCardLabels: LabelState[];
//   participants: string[];
// }

// const CardModal: React.FC<CardModalProps> = ({ activeCardLabels, participants }) => {
//   const boardId = useContext(BoardIdContext);
//   const cardId = useContext(CardIdContext);
//   const { currentData } = useGetBoardByIdQuery(boardId);

//   const card = currentData && currentData.cards.find((c) => c._id === cardId);
//   const column = currentData && currentData.columns.find((c) => c._id === card?._id);

//   const [cardBody, setCardBody] = useState(card?.body);
//   const [cardTitle, setCardTitle] = useState(card?.title);
//   const [isTitleEdit, setIsTitleEdit] = useState(false);

//   const [deleteCardMutation] = useDeleteCardMutation();
//   const [updateCardMutation] = useUpdateCardMutation();

//   const navigate = useNavigate();

//   console.log(cardId);

//   console.log(card);

//   const closeModal = () => {
//     navigate(`/board/${boardId}`);
//   };

//   if (!card || !column) closeModal();
//   else
//     return (
//       <AppModal handleClose={closeModal}>
//         {isTitleEdit ? (
//           <TitleInput type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} onClick={(e) => e.stopPropagation()} />
//         ) : (
//           <ModalHeader onClick={() => setIsTitleEdit(true)}>{cardTitle}</ModalHeader>
//         )}
//         <ModalSubHeader>At column {column.title}</ModalSubHeader>
//         <ModalSubHeader>Created at: {new Date(card.createdAt).toLocaleString()}</ModalSubHeader>
//         <ModalContent>
//           <ModalDetails>
//             <ModalSection>
//               <CardParticipantList participants={participants} />
//             </ModalSection>
//             <ModalSection>
//               <CardLabelList activeLabels={activeCardLabels} />
//             </ModalSection>
//             <ModalSection>
//               <div>Card Description</div>
//               <CardBodyArea value={cardBody} onChange={(e) => setCardBody(e.target.value)} />
//             </ModalSection>
//           </ModalDetails>
//           <ModalSideBar>
//             <div>Actions</div>
//             <DeleteButton
//               onClick={() => {
//                 deleteCardMutation(cardId);
//               }}
//             >
//               Delete Card
//             </DeleteButton>
//             <SaveButton
//               onClick={() => {
//                 updateCardMutation({
//                   body: { title: cardTitle, body: cardBody },
//                   cardId: cardId,
//                 });
//                 closeModal();
//               }}
//             >
//               Save
//             </SaveButton>
//             <CardParticipantsButton cardId={cardId} />
//             <CardLabelsButton activeLabels={activeCardLabels} cardId={cardId} />
//           </ModalSideBar>
//         </ModalContent>
//       </AppModal>
//     );
// };

// export default CardModal;
