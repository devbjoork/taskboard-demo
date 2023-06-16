import React from 'react';
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { firebaseApp } from '../../auth/firebase';
import { Icon } from '@iconify/react';
import {
  WelcomeContainer,
  WelcomeSection,
  SignUpSection,
  SignUpHeading,
  ProviderButton,
} from './AuthPage.styled';
import { useSendUserDataMutation } from '../../services/bff/users.api';
import Header from '../../components/Header/Header';

const AuthPage: React.FC = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  const [sendUserData] = useSendUserDataMutation();

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(firebaseApp);
      // await signInWithRedirect(auth, googleAuthProvider);
      const res = await signInWithPopup(auth, googleAuthProvider);
      // const result = await getRedirectResult(auth);
      const user = res.user;
      const sendDataResult = await sendUserData({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoURL,
      });
      // console.log(result);
      // if (result) {
      //   // This is the signed-in user
      //   const user = result.user;
      //   console.log(user);
      //   // This gives you a Facebook Access Token.
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   console.log(credential);
      //   if (credential) {
      //     const token = credential.accessToken;
      //     console.log(token);
      //   }
      // }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
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
    </>
  );
};

export default AuthPage;
