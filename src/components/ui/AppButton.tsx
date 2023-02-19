import React, { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  isTransparent?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  border: transparent;
  display: flex;
  align-items: center;
  padding: .5rem;
  background-color: #aaabb3;
  border-radius: 3px;

  &:hover {
    background-color: #8f8f94 !important;
  }
`;

const AppButton: React.FC<PropsWithChildren<ButtonProps>> = ({children, isTransparent = false}) => {
  return (
    <StyledButton style={{ backgroundColor: isTransparent ? 'transparent': '#aaabb3' }}>{children}</StyledButton>
  );
};

export default AppButton;