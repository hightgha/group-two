import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import useLayout from '../../hooks/useLayout';
import { DEVICES } from '../../constants/categories';

export default function CancelDialog(props) {
  const { handleClose, onConfirm } = props;
  const device = useLayout();

  return (
    <Dialog open fullScreen={device !== DEVICES.desktop} onClose={handleClose}>
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
