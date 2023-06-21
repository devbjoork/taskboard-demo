import styled from 'styled-components';

export const MenuButton = styled.button`
  background: none;
  border: none;
  border-radius: 0.25rem;
  height: 2rem;
  width: 2rem;

  &:hover {
    transition: all 76ms ease-in-out;
    background-color: #e7e7e7;
  }
`;

export const ColumnPopoverMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0.25rem;
  font-weight: normal;
  min-width: 250px;

  span {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
    font-size: 0.95rem;
  }

  hr {
    margin: 0 1rem;
    background-color: #b1b1b1;
  }

  ul {
    list-style: none;
    padding: 0.25rem 0;

    li {
      line-height: 2rem;
      padding-left: 1rem;
      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
`;

// very same as MenuButton from ProfileMenuList.styled
export const ColumnMenuButton = styled.button`
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
`;
