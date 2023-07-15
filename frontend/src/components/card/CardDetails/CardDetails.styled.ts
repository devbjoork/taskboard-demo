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
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.isConfirm ? '#8962ff' : '#ddd')};
`;

export const DetailsBody = styled.div`
  display: flex;
  padding: 1rem 0 1rem 2.5rem;

  /* timymce override */
  .tox {
    width: 100%;
  }
`;
