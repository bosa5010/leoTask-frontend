import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFormikContext } from "formik";
export default function AppDialog({
  onClose,
  open = Boolean(false),
  setOpen,
  message,
  disagree = "Cancele",
  agree = "Valider",
  title,
}) {
  const { setFieldValue, resetForm, values } = useFormikContext();

  const handleClose = () => {
    setOpen(Boolean(false));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              onClose && onClose(setFieldValue, resetForm, values);
            }}
            color="primary"
            autoFocus
          >
            {agree}
          </Button>
          <Button
            onClick={() => {
              setOpen(Boolean(false));
            }}
            color="primary"
          >
            {disagree}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
