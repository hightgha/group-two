import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function BooklIconDialog(props) {
  return (
    <Dialog open onClose={props.handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle>new date</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter how long you are going to be here</DialogContentText>
        <TextField onChange={props.onDateChange} value={props.editedDate} autoFocus margin='dense' type='date' fullWidth />
        <TextField onChange={props.onDateChange} value={props.editedDate} autoFocus margin='dense' type='date' fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={props.handleClose} color='primary'>
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
