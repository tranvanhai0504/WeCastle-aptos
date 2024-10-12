import React from "react";
import styled from "styled-components";

interface CustomButtonProps {
  content: string;
  onClick: () => void;
  disabled: boolean;
}

const CustomButton = ({ content, onClick, disabled }: CustomButtonProps) => {
  return (
    <ButtonContainer>
      <ButtonStyled onClick={onClick} disabled={disabled}>
        {content}
      </ButtonStyled>
    </ButtonContainer>
  );
};

// Styled component for the button container
const ButtonContainer = styled.div`
  display: inline-block;
  padding: 3px;
  background-color: #ff9d43;
  margin-top: 10px;
  border-radius: 1rem;
`;

// Styled component for the button
const ButtonStyled = styled.button`
  width: 120px;
  height: 40px;
  font-size: 18px;
  letter-spacing: 2px;
  cursor: pointer;
  color: black;
`;

export default CustomButton;
