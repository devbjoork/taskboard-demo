import styled from 'styled-components';

export const DetailsContainer = styled.div``;

export const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const HeaderButton = styled.button<{ isConfirm?: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #58595a;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.isConfirm ? '#dbe8ff' : '#f9f9f9')};
  color: #58595a;
  padding: 0.5rem 1rem;

  :hover {
    background-color: ${(props) => (props.isConfirm ? '#c4d0e5' : '#f1f1f1')};
  }
`;

export const DetailsBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem 0 1rem 2.5rem;

  /* timymce override */
  .tox {
    width: 100%;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;
