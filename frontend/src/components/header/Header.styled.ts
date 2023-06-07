import styled from 'styled-components';

export const AppHeader = styled.nav`
  display: flex;
  color: #fff;
  justify-content: space-between;
  padding: 0 1rem;
  height: 45px;
  background-color: #62b6ff;
  box-shadow: 0 1px 10px #3e98e7;
  position: relative;
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 1rem;
  }
`;

export const AppTitle = styled.h1`
  font-size: large;
  margin: 0 0.5rem;

  &:hover {
    color: #cbe7ff;
    cursor: pointer;
  }
`;
