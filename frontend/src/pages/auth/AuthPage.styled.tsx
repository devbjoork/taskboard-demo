import styled from 'styled-components';

export const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 45px);
  background-color: #62b6ff;
`;

export const WelcomeSection = styled.section`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

export const SignUpSection = styled.section`
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

export const SignUpHeading = styled.div`
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

export const ProviderButton = styled.button`
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