import { PropsWithChildren } from 'react';

const AppEditableTitle: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return <button>{children}</button>;
};

export default AppEditableTitle;
