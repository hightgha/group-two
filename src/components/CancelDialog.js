import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function CancelDialog(props) {
  const { handleClose, onConfirm } = props;
  return (
    <Dialog open onClose={handleClose}>
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
