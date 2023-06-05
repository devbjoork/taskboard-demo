import styled from 'styled-components';

export const MenuButton = styled.button`
  background: none;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem;

  &:hover {
    background-color: #e7e7e7;
  }
`;

export const ColumnPopoverMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0.25rem;
  /* border: 1px solid #e4f2ff; */
  /* box-shadow: 0px 0px 12px 2px #e4f2ff; */
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
