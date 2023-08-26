import { UserData } from '@/services/bff/types';

const AppUserList: React.FC<{ users: UserData[] }> = ({ users }) => {
  return <div>{users.map((u) => u.email)}</div>;
};

export default AppUserList;
