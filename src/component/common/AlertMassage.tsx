import { Alert, Snackbar } from "@mui/material"
import React, { Dispatch, FC } from "react"
import { responseStatus } from "../../const/constant"
import { connect } from "react-redux"
import { hideAlert } from "../../store/alert/alertReducer"

interface dataProps {
  message: string,
  status: number,
  hideAlert?: () => void
}
interface DispatchProps {
  hideAlert: () => void
}
const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  hideAlert: () => dispatch(hideAlert()),
})

const AlertMassage: FC<dataProps> = ({ message, status, hideAlert }) => {
  const [open, setOpen] = React.useState(true)
  const handleClose = () => {
    setOpen(false)
    if (hideAlert) hideAlert()
  }

  return (
    <div>
      <Snackbar
        sx={{ height: "35%" }}
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
        <Alert
          onClose={handleClose}
          severity={
            status === responseStatus.SUCCESS || status === responseStatus.CREATE_SUCCESS
              ? "success"
              : "error"}
          sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(AlertMassage)