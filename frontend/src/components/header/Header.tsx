import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { firebaseApp } from "@/auth/firebase";
import { ThemePrefs } from "@/services/bff/types";
import { resetUserCreds } from "@/store/userCredsSlice";
import { RootState } from "@/store/store";
import { getAuth } from "firebase/auth";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { AppHeader, HeaderSection, AppTitle } from "./Header.styled";


interface HeaderProps {
  theme?: ThemePrefs;
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photo = useSelector((state: RootState) => state.userCreds.photoURL);

  const navigateDashboard = () => {
    navigate('/dashboard');
  };

  const logOut = () => {
    const auth = getAuth(firebaseApp);
    dispatch(resetUserCreds());
    auth.signOut();
  };

  return (
    <AppHeader theme={theme}>
      <HeaderSection theme={theme}>
        <Icon icon="uil:react" fontSize="24" />
        <AppTitle theme={theme} onClick={navigateDashboard}>
          TaskBoard
        </AppTitle>
      </HeaderSection>
      <HeaderSection>{photo && <ProfileMenu profileThumb={photo} logoutHandler={logOut} />}</HeaderSection>
    </AppHeader>
  );
};

export default Header;
