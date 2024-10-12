import styled from "styled-components";

export const ButtonLogout = styled.button`
  color: gray;
  font-size: 1rem;
  font-weight: 900;
`
export const Button = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  margin: 0.2rem 0;
  border-radius: 2px;
  font-size: 1rem;
`
export const ButtonFaucet = styled(Button)`
  background-color: "rgb(6, 247, 247)";
  color:"rgb(42, 49, 49)";
  font-weight: 900;
  border: 1px solid #333;
  textTransform:"uppercase";

  &:hover, active {
  backgroundColor: "rgb(6, 247, 247)";
  color: black;
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.20) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
`
