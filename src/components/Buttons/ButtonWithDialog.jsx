import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import React from "react";

function ButtonWithDialog(props) {
  const { dialogTitle, dialogState, setDialogState, onConfirmHandler } = props;

  return (
    <Dialog
      open={dialogState}
      onClose={() => setDialogState(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogState(false)}>Cancel</Button>
        <Button onClick={onConfirmHandler} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ButtonWithDialog;
