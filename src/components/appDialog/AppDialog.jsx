import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
export default function AppDialog({
  onClose,
  open,
  setOpen,
  message,
  disagree = "Cancel",
  agree = "Agree",
  title,
}) {
  const handleClose = () => {
    setOpen(false);
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
          {!agree && (
            <Button
              onClick={() => {
                handleClose();
                onClose && onClose();
              }}
              color="primary"
              autoFocus
            >
              {agree}
            </Button>
          )}
          <Button
            onClick={() => {
              setOpen(false);
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
