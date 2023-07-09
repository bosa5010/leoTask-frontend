import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 0;
  const left = 0;

  return {
    top: "1%",
    left: "3%",
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function AppModal({
  className = "primary",
  children,
  onOpen,
  onClose,
  open,
  setOpen,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    onOpen && onOpen();
  };

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={(classes.paper, "appModal")}>
          <button
            className="itemListEdit"
            style={{ right: 0, position: "absolute" }}
            onClick={() => {
              handleClose();
              setOpen(false);
            }}
          >
            Close
          </button>

          {children}
        </div>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "90%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
