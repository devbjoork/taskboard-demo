import styled from 'styled-components';

export const PopoverContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background-color: #fff;
  border-radius: 0.25rem;
  color: #111;
  box-shadow: 0px 0px 3px 0px #e3e3e3;
`;

export const PopoverTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  border-bottom: 1px solid lightgray;
  margin: 1rem 1rem 0 1rem;
`;

export const CloseButton = styled.button`
  display: flex;
  align-self: center;
  background: none;
  border: none;

  svg {
    color: grey;
  }
`;
