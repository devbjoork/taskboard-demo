export interface Board {
  _id: string;
  title: string;
  isPrivate: boolean;
  ownerId: string;
  users: any[];
  columns: Column[];
  labels: Label[];
  starred?: boolean;
  userData: any[];
}

export interface Column {
  _id: string;
  title: string;
  board: string;
  tasks: Task[];
}

export interface Label {
  _id: string;
  title?: string;
  boardId: string;
  color: string;
}

export interface Task {
  _id: string;
  title: string;
  body: string;
  author: string;
  createdAt: Date;
  column: string;
  board: string;
  assignee: any[];
  labels: any[];
}