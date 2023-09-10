import styled from 'styled-components';

export const ProfilePopoverMenu = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  width: 250px;
  font-weight: normal;
`;

export const MenuButton = styled.button`
  display: flex;
  border: none;
  background: none;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  font-weight: bold;
  transition: all 76ms ease-in-out;

  :first-of-type {
    margin-top: 0.75rem;
  }

  :hover {
    background-color: #fafafa;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const MenuSeparator = styled.hr`
  border: none;
  height: 1px;
  color: lightgray;
  background-color: lightgray;
  margin: 0.5rem 1rem 0 1rem;
`;
