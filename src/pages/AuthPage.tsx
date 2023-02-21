import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from 'firebase/auth';
import { firebaseApp } from '../auth/firebase';
import { Icon } from '@iconify/react';
import styled from 'styled-components';

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

const LabeledInput = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.3rem 0.8rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
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

const LoginButton = styled.button`
  padding: 0.4rem 2rem;
  align-self: end;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 0.25rem;

  &:hover {
    background-color: #eee;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const SeparatorWithText = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin: 0.5rem 0;

  &::after,
  ::before {
    content: '';
    height: 1px;
    background-color: silver;
    flex-grow: 1;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const SignUpReminder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  height: 30px;

  button {
    margin-left: 0.5rem;
    font-weight: bold;
    border: none;
    background: none;
    height: 100%;

    &:hover {
      color: #555;
    }
  }
`;

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('dashboard');
      }
    });
  });

  const googleAuthProvider = new GoogleAuthProvider();

  const createUser = async (email: string, password: string) => {
    try {
      const auth = getAuth(firebaseApp);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const auth = getAuth(firebaseApp);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.log(e);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const userCredential = await signInWithRedirect(auth, googleAuthProvider);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpSection>
      <SignUpHeading>
        <h2>Sign up</h2>
        <h3>Enter your details.</h3>
      </SignUpHeading>
      <ProviderButton onClick={signInWithGoogle}>
        <Icon icon="uil:google" fontSize="28" color="gray" />
        Log in with Google
      </ProviderButton>
      <SeparatorWithText>or</SeparatorWithText>
      <LoginForm>
        <LabeledInput>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabeledInput>
        <LabeledInput>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabeledInput>
        <LoginButton>Log in</LoginButton>
      </LoginForm>
      <SignUpReminder>
        <span>Already have an account?</span>
        <button onClick={() => signIn(email, password)}>Sign in</button>
      </SignUpReminder>
    </SignUpSection>
  );
};

export default AuthPage;
