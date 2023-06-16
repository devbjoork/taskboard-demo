import styled from 'styled-components';

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.85);
  width: 100vw;
  height: 100vh;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #58595a;
  border: 1px solid #999;
  border-radius: 0.25rem;
  padding: 1.5rem;
`;
