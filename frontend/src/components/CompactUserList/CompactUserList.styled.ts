import styled from 'styled-components';

export const UserImage = styled.img`
  border-radius: 1rem;
  margin-left: -0.3rem;
  border: 2px solid #fff;
`;

export const UserListContainer = styled.div`
  display: flex;
`;

export const UserListDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-weight: normal;
  font-size: 1rem;
`;

export const UserRow = styled.div`
  display: flex;
  padding: 0.1rem 0rem;
  font-size: 1rem;
  font-weight: normal;
  justify-content: space-between;
  font-size: 0.8rem;
`;

export const UserDetail = styled.div`
  display: flex;
  gap: 0.5rem;
  min-width: 250px;
  max-width: 250px;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const UserMore = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    border: none;
    width: 1.2rem;
    background: #565656;
    border-radius: 0.25rem;

    svg {
      color: white;
    }
  }
`;
