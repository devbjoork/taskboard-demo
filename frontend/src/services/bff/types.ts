export interface Board {
  _id: string;
  title: string;
  isPrivate: boolean;
  ownerId: string;
  users: any[];
  columns: ColumnState[];
  labels: Label[];
  starred?: boolean;
  userData: any[];
}

export interface ColumnState {
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
  textColor: string;
  name: string;
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

export interface UserData {
  disabled: false;
  displayName: string;
  email: string;
  emailVerified: boolean;
  metadata: Metadata;
  photoURL: string;
  providerData: ProviderData[];
  tokensValidAfterTime: string;
  uid: string;
}

export interface ProviderData {
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
  uid: string;
}

export interface Metadata {
  creationTime: string;
  lastRefreshTime: string;
  lastSignInTime: string;
}
