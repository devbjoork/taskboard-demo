import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BoardsState {
  currentBoard: CurrentBoardState;
  boards: any[];
}

export interface CurrentBoardState {
  _id: string;
  title: string;
  isPrivate: boolean;
  ownerId: string;
  users: any[];
  columns: ColumnState[];
}

export interface ColumnState {
  _id: string;
  title: string;
  boardId: string;
  tasks: TaskState[];
}

export interface TaskState {
  _id: string;
  title: string;
  body: string;
  author: string;
  createdAt: Date;
  column: string;
  assignee: any[];
  labels: any[];
}

export interface CardPositionParam {
  columnId: string;
  index: number;
}

export interface MoveCardPayload {
  source: CardPositionParam;
  target: CardPositionParam;
}

const initialState: BoardsState = {
  currentBoard: {
    _id: '',
    title: '',
    isPrivate: false,
    ownerId: '',
    users: [],
    columns: [],
  },
  boards: [],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard: (state, action: PayloadAction<CurrentBoardState>) => {
      const { _id, title, isPrivate, ownerId, users, columns } = action.payload;
      state.currentBoard._id = _id;
      state.currentBoard.title = title;
      state.currentBoard.isPrivate = isPrivate;
      state.currentBoard.ownerId = ownerId;
      state.currentBoard.users = users;
      state.currentBoard.columns = columns;
    },
    addBoards: (state, action: PayloadAction<any[]>) => {
      state.boards = action.payload;
    },
    renameBoard: (state, action: PayloadAction<string>) => {
      state.currentBoard.title = action.payload;
      const board = state.boards.find((b) => b._id === state.currentBoard._id);
      if (board) board.title = action.payload;
    },
    removeBoardFromList: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((b) => b._id !== action.payload);
    },
    addColumnToCurrent: (state, action: PayloadAction<ColumnState>) => {
      state.currentBoard.columns.push(action.payload);
    },
    removeColumnFromCurrent: (state, action: PayloadAction<string>) => {
      state.currentBoard.columns = state.currentBoard.columns.filter(
        (c) => c._id !== action.payload
      );
    },
    changeColumnTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const column = state.currentBoard.columns.find(
        (c) => c._id === action.payload.id
      );
      if (column) column.title = action.payload.title;
    },
    addCardToColumn: (state, action: PayloadAction<any>) => {
      const column = state.currentBoard.columns.find(
        (c) => c._id == action.payload.columnId
      );
      if (column) column.tasks.push(action.payload.card);
    },
    moveCard: (state, action: PayloadAction<MoveCardPayload>) => {
      const sourceColumn = state.currentBoard.columns.find(
        (c) => c._id === action.payload.source.columnId
      );
      const cardClone =
        sourceColumn?.tasks[action.payload.source.index] || null;
      if (cardClone) {
        const targetColumn = state.currentBoard.columns.find(
          (c) => c._id === action.payload.target.columnId
        );
        if (targetColumn) {
          console.log(action.payload);
          cardClone.column = action.payload.target.columnId;
          sourceColumn?.tasks.splice(action.payload.source.index, 1);
          targetColumn.tasks.splice(action.payload.target.index, 0, cardClone);
        }
      }
    },
    updateCard: (
      state,
      action: PayloadAction<{
        columnId: string;
        taskId: string;
        body: string;
        title: string;
      }>
    ) => {
      const column = state.currentBoard.columns.find(
        (c) => c._id === action.payload.columnId
      );
      if (column) {
        const task = column.tasks.find((t) => t._id === action.payload.taskId);
        if (task) {
          task.body = action.payload.body;
          task.title = action.payload.title;
        }
      }
    },
    deleteCard: (state, action: PayloadAction<any>) => {
      const column = state.currentBoard.columns.find(
        (c) => c._id === action.payload.columnId
      );
      if (column)
        column.tasks = column.tasks.filter(
          (task) => task._id !== action.payload.id
        );
    },
  },
});

export const {
  setCurrentBoard,
  addBoards,
  renameBoard,
  removeBoardFromList,
  addColumnToCurrent,
  removeColumnFromCurrent,
  changeColumnTitle,
  addCardToColumn,
  moveCard,
  updateCard,
  deleteCard,
} = boardsSlice.actions;
export default boardsSlice.reducer;
