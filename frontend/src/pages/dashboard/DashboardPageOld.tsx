// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import BoardItem from '../../components/board-item/BoardItem';
// import NewBoardModal from '../../components/NewBoardModal';
// import {
//   useCreateBoardMutation,
//   useLazyGetBoardsQuery,
// } from '../../services/bff/boards.api';
// import { addBoards } from '../../store/boardsSlice';
// import { RootState } from '../../store/store';
// import {
//   BoardsContainer,
//   BoardsHeading,
//   BoardList,
//   NewBoardButton,
// } from './DashboardPage.styled';

// const DashboardPage: React.FC = () => {
//   const token = useSelector((state: RootState) => state.userCreds.accessToken);
//   const boards = useSelector((state: RootState) => state.boards.boards);
//   const dispatch = useDispatch();
//   const [lazyGetBoards, boardResult] = useLazyGetBoardsQuery();
//   const [createBoard] = useCreateBoardMutation();
//   const navigate = useNavigate();

//   const [newModalVisible, setNewModalVisible] = useState(false);

//   useEffect(() => {
//     if (token) lazyGetBoards();
//   }, [token]);

//   useEffect(() => {
//     if (boardResult.isSuccess) dispatch(addBoards(boardResult.data));
//   }, [boardResult]);

//   const handleCloseModal = () => {
//     setNewModalVisible(false);
//   };

//   const handleCreateBoard = async (createPayload: any) => {
//     const res: any = await createBoard(createPayload);
//     setNewModalVisible(false);
//     navigate(`/board/${res.data._id}`);
//   };

//   return (
//     <BoardsContainer>
//       <BoardsHeading>Your boards</BoardsHeading>
//       <BoardList>
//         {boards.map((board: any) => {
//           return (
//             <BoardItem key={board._id} id={board._id} title={board.title} />
//           );
//         })}
//         <NewBoardButton onClick={() => setNewModalVisible(true)}>
//           Create board
//         </NewBoardButton>
//         {newModalVisible ? (
//           <NewBoardModal
//             handleClose={handleCloseModal}
//             handleCreate={handleCreateBoard}
//           />
//         ) : (
//           <></>
//         )}
//       </BoardList>
//     </BoardsContainer>
//   );
// };

// export default DashboardPage;
