import styled from 'styled-components';

export const ProfilePopoverMenu = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  width: 250px;
  /* border: 1px solid #e4f2ff; */
  /* box-shadow: 0px 0px 12px 2px #e4f2ff; */
  font-weight: normal;

  div {
    padding: 0.25rem;
    display: flex;
    justify-content: center;
  }

  hr {
    margin: 0 1rem;
  }

  ul {
    padding: 8px 0;
    list-style: none;
  }

  li {
    padding: 0 1rem;
    line-height: 2rem;

    &:hover {
      background-color: #f7f7f7;
    }
  }
`;
