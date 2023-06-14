export interface Board {
  _id: string;
  title: string;
  isPrivate: boolean;
  ownerId: string;
  users: any[];
  columns: ColumnState[];
  cards: CardState[];
  labels: LabelState[];
  starred?: boolean;
  userData: UserData[];
}

export interface ColumnState {
  _id: string;
  title: string;
  board: string;
  cards: string[];
}

export interface LabelState {
  _id: string;
  title?: string;
  boardId: string;
  color: string;
  textColor: string;
  name: string;
}

export interface CardState {
  _id: string;
  title: string;
  body: string;
  author: string;
  createdAt: Date;
  column: string;
  board: string;
  assignee: string[];
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
