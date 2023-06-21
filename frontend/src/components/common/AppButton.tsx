import { PropsWithChildren } from 'react';

const AppEditableTitle: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <button>{children}</button>;
};

export default AppEditableTitle;
