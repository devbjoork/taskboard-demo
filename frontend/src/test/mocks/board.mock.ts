import { Board } from "@/services/bff/types";

export const mockBoard: Board = {
  _id: 'id1',
  title: '1',
  isPrivate: false,
  ownerId: '',
  users: [],
  columns: [],
  cards: [],
  labels: [],
  starred: false,
  userData: [],
  themePrefs: {
    _id: '',
    name: '',
    type: '',
    colors: {
      bg: '',
      fg: '',
      shadow: '',
    },
  },
};

export const mockBoard2: Board = {
  _id: 'id2',
  title: '2',
  isPrivate: false,
  ownerId: '',
  users: [],
  columns: [],
  cards: [],
  labels: [],
  starred: false,
  userData: [],
  themePrefs: {
    _id: '',
    name: '',
    type: '',
    colors: {
      bg: '',
      fg: '',
      shadow: '',
    },
  },
};