import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@material-ui/core';

export default function CancelDialog(props) {
  const { handleClose, onConfirm } = props;
  const fullScreen = useMediaQuery('@media (max-width: 950px)');

  return (
    <Dialog open fullScreen={fullScreen} onClose={handleClose}>
      <DialogTitle>Confirm your cancellation</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to cancel your booking</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onConfirm} color='primary' autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
