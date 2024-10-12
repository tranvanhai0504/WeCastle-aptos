import React from "react";
import styled from "styled-components";

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

const CustomInput = ({
  value,
  onChange,
  placeholder,
  disabled = false,
}: CustomInputProps) => {
  return (
    <TextFieldStyled
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

// Styled component for the input field
const TextFieldStyled = styled.input`
  font-family: "VT323", monospace;
  padding: 10px;
  font-size: 18px;
  background-color: rgb(221 221 221 / 0.2);
  color: black;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  outline: none;
  border-radius: 1rem;

  &:focus {
    border-color: #1e2a2a;
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #ddd;
    cursor: not-allowed;
  }
`;

export default CustomInput;
