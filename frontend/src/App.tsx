import { getAuth, User } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { firebaseApp } from '@/auth/firebase';
import GlobalStyles from '@/components/Global';
import AuthPage from '@/pages/auth/AuthPage';
import BoardPage from '@/pages/board/BoardPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import { setUserCreds } from '@/store/userCredsSlice';

import { CardModalPage } from './pages/card/CardModalPage';
import { ProfilePage } from './pages/profile/ProfilePage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const cardId = params.cardId || '';
  console.log(cardId);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    auth.onAuthStateChanged(async (user: User | null) => {
      if (!user && pathname !== '/welcome') {
        localStorage.removeItem('accessToken');
        navigate('welcome');
      } else if (user && (pathname == '/' || pathname == '/welcome')) {
        navigate('dashboard');
      }

      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('accessToken', token);

        dispatch(
          setUserCreds({
            accessToken: token,
            refreshToken: user.refreshToken,
            uid: user.uid,
            photoURL: user.photoURL || '',
          })
        );
      }
    });

    auth.onIdTokenChanged(async (user: User | null) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('accessToken', token);
        dispatch(
          setUserCreds({
            accessToken: token,
            refreshToken: user.refreshToken,
            uid: user.uid,
            photoURL: user.photoURL || '',
          })
        );
      }
    });
  });

  return (
    <AppContainer>
      <GlobalStyles />
      <Routes>
        <Route path="/welcome" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/board/:boardId" element={<BoardPage />}>
          <Route path="/board/:boardId/card/:cardId" element={<CardModalPage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
