import { XIcon } from "@heroicons/react/outline";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { FC } from "react";
import getStyles from "./styles";
import { ToastProps } from "./types";

/**
 * Component displaying a dialog of certain information to the user.
 */
const Toast: FC<ToastProps> = (props) => {
  const styles = getStyles(props.color);
  return (
    <Dialog
      open={props.open}
      onClose={(_event, reason) => {
        if (reason === "backdropClick") return !props.disableClose && props.onClose();
        props.onClose();
      }}
      PaperProps={{ sx: styles.paper }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {!props.disableClose && (
        <IconButton aria-label="close" sx={styles.closeButton} onClick={props.onClose}>
          <XIcon />
        </IconButton>
      )}
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      {props.description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.description}</DialogContentText>
          {props.children}
        </DialogContent>
      )}
      <DialogActions>
        {props.type === "confirm" && (
          <Button variant="contained" onClick={props.onClose}>
            No
          </Button>
        )}
        {props.type !== "none" && (
          <Button
            variant="contained"
            color={props.type === "confirm" ? "secondary" : "inherit"}
            onClick={() => {
              props.onConfirm?.();
              props.onClose();
            }}
          >
            {props.type === "confirm" ? "Yes" : props.type === "alert" ? "Ok" : ""}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Toast;
