import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const alertDialog = ({
  showDialog,
  onCloseDialog,
  dialogTitle,
  contentText
}) => (
  <Dialog
    open={showDialog}
    onClose={onCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {contentText}
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

export default alertDialog;
