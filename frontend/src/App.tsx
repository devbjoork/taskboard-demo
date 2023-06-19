import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseApp } from '@/auth/firebase';
import GlobalStyles from '@/components/Global';
import AuthPage from '@/pages/auth/AuthPage';
import BoardPage from '@/pages/board/BoardPage';
import { setUserCreds } from '@/store/userCredsSlice';
import DashboardPage from '@/pages/dashboard/DashboardPage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    auth.onAuthStateChanged((user: any) => {
      if (!user && pathname !== '/welcome') {
        navigate('welcome');
      } else if (user && (pathname == '/' || pathname == '/welcome')) {
        navigate('dashboard');
      }

      if (user) {
        dispatch(
          setUserCreds({
            accessToken: user.stsTokenManager.accessToken,
            refreshToken: user.stsTokenManager.refreshToken,
            uid: user.uid,
            photoURL: user.photoURL,
          })
        );
      }
    });

    auth.onIdTokenChanged(async (user: any) => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(
          setUserCreds({
            accessToken: token,
            refreshToken: user.stsTokenManager.refreshToken,
            uid: user.uid,
            photoURL: user.photoURL,
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
        <Route path="/board/:boardId" element={<BoardPage />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
