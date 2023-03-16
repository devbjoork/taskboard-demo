import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseApp } from './auth/firebase';
import GlobalStyles from './components/Global';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import BoardPage from './pages/BoardPage';
import DashboardPage from './pages/DashboardPage';
import { setUserCreds } from './store/userCredsSlice';

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
            accessToken: user.accessToken,
            photoURL: user.photoURL,
          })
        );
      }
    });

    auth.onIdTokenChanged((user: any) => {
      if (user) {
        dispatch(
          setUserCreds({ accessToken: user.accessToken, photoURL: user.photoURL })
        );
      }
    });
  });

  return (
    <AppContainer>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/welcome" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/board/:boardId" element={<BoardPage />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
