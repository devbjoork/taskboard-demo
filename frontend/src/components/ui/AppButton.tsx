import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  isTransparent?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  border: transparent;
  color: #000;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #aaabb3;
  border-radius: 3px;

  &:hover {
    background-color: #62b6ff !important;
  }
`;

const AppButton: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  isTransparent = false,
}) => {
  return (
    <StyledButton
      style={{ backgroundColor: isTransparent ? 'transparent' : '#ffffff' }}
    >
      {children}
    </StyledButton>
  );
};

export default AppButton;
