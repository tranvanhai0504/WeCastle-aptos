import styled from "styled-components";
import { Box, Grid, TextField } from "@mui/material";

export const ContainerBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  gap:8px;
  margin-top:10px

`;

export const FlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const GridContainer = styled(Grid)`
  width: 100%;
  display: flex;
  justify-content: left;
`;


export const ButtonContainer = styled.div`
  width:140px
  `