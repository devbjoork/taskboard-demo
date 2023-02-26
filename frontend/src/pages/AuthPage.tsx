import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { firebaseApp } from '../auth/firebase';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 45px);
  background-color: #62b6ff;
`;

const WelcomeSection = styled.section`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const SignUpSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  background-color: #fefefe;
  color: #333236;
  border: 1px solid #eee;
  border-radius: 0.25rem;
  width: 500px;
`;

const SignUpHeading = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  h2 {
    font-weight: bold;
    font-size: 1.75rem;
  }

  h3 {
    font-weight: 400;
    font-size: 0.8rem;
  }
`;

const ProviderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  background-color: #fafafa;
  font-size: 1rem;
  font-weight: bold;
  color: #666;

  &:hover {
    background-color: #eee;
  }

  svg {
    margin-right: 1rem;
  }
`;

const AuthPage: React.FC = () => {
  const googleAuthProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await signInWithRedirect(auth, googleAuthProvider);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <WelcomeContainer>
      <WelcomeSection>
        <h1>Welcome to TaskBoard Demo</h1>
        <div>This is a simple Trello-like app made with react.</div>
      </WelcomeSection>
      <SignUpSection>
        <SignUpHeading>
          <h2>Sign up</h2>
          <h3>Enter your details.</h3>
        </SignUpHeading>
        <ProviderButton onClick={signInWithGoogle}>
          <Icon icon="uil:google" fontSize="28" color="gray" />
          Log in with Google
        </ProviderButton>
      </SignUpSection>
    </WelcomeContainer>
  );
};

export default AuthPage;
