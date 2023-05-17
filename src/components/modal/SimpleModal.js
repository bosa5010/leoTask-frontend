import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Icon from "@material-ui/core/Icon";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  // return {
  //   top: `${top}%`,
  //   left: `${left}%`,
  //   transform: `translate(-${top}%, -${left}%)`,
  // };
  return {
    top: "50%",
    left: "50%",
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SimpleModal({
  title = "Ouvrire Modal",
  className = "primary",
  children,
  onOpen,
  onClose,
  icon,
  component,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    onOpen && onOpen();
  };

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <div>
      {icon ? (
        <Icon className={`${icon} icon small`} onClick={handleOpen}>
          {icon}
        </Icon>
      ) : component ? (
        <button type="button" className={className} onClick={handleOpen}>
          {component}
        </button>
      ) : (
        <button type="button" className={className} onClick={handleOpen}>
          {title}
        </button>
        // <Icon onClick={handleOpen}>{icon}</Icon>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <button type="button" className={className} onClick={handleClose}>
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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
