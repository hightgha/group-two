import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CancelIconDialog(props) {
  return (
    <>
      <Dialog open onClose={props.handleClose}>
        <DialogTitle>{'Confirm your cancellation'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to cancel your booking</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={props.onConfirmCancellation} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      ;
    </>
  );
}
