import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  /* flex: 1; */
  gap: 2rem;
  justify-content: center;
`;

export const DashboardMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
`;

export const MenuButton = styled.button<{active: boolean}>`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.25rem;
  font-weight: 600;
  min-width: 10rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background: ${(props) => props.active ? '#fefefe' : 'none'};
  color: ${(props) => props.active ? '#0b0b0b' : '#fefefe'};

  &:hover {
    background-color: ${(props) => props.active ? '#fefefe' : 'rgba(52, 130, 197, 0.7)'};
  }
`;

export const BoardsContainer = styled.div`
  /* flex: 1; */
  /* background-color: #62b6ff; */
`;

// export const BoardsHeading = styled.h3`
//   text-transform: uppercase;
//   padding-top: 1rem;
//   padding-left: 1rem;
//   color: #fff;
// `;

// export const BoardList = styled.main`
//   display: flex;
//   flex-wrap: wrap;
//   margin: 1rem;
// `;
