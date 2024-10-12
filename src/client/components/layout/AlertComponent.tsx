import { Alert, Snackbar } from "@mui/material";
import React from "react";
interface Pros {
  openAlert: boolean;
  handleCloseAlert: () => void;
  content: string;
}
const AlertComponent = ({ handleCloseAlert, openAlert, content }: Pros) => {
  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleCloseAlert}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {content}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
