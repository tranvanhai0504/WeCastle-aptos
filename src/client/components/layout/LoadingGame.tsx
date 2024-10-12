// import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
interface ILoading {
  progress: number;
}
const LoadingGame = ({ progress }: ILoading) => {
  const loadingContainerStyle = {
    borderRadius:"12px",
    position: "relative",
    height: "500px", 
    width: "1000px", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    backgroundImage: "url(mainBg.jpg)", 
    backgroundSize: "cover", 
    backgroundPosition: "center", 
  };

  return (
    <Box sx={loadingContainerStyle} >
      <CircularProgress variant="indeterminate" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="white">
          {`${Math.round(progress * 100)}%`}
        </Typography>
      </Box>
    </Box>

  );
};

export default LoadingGame;
