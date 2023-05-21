import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { firebaseApp } from '../../auth/firebase';
import { Icon } from '@iconify/react';
import {
  WelcomeContainer,
  WelcomeSection,
  SignUpSection,
  SignUpHeading,
  ProviderButton,
} from './AuthPage.styled';

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
