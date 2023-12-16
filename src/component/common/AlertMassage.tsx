import { Alert, Snackbar } from "@mui/material";
import React, { FC } from "react";
import { responseStatus } from "../../const/constant";

interface dataProps {
  message: string,
  status: string
}
const AlertMassage: FC<dataProps> = ({ message, status }) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
      >
        <Alert onClose={handleClose} severity={status == responseStatus.SUCCESS ? "success" : "error"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AlertMassage