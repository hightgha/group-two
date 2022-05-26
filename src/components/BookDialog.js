import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import UserContext from '../contexts/UserContext';
import { DialogTitle } from '@material-ui/core';

export default function BookDialog(props) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const user = useContext(UserContext);
  const { handleClose, onConfirm } = props;
  console.log(from, to);
  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Booking now</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter how long you are going to be here</DialogContentText>
        <TextField label='From' margin='dense' onChange={(e) => setFrom(e.target.value)} value={from} type='date' fullWidth />
        <TextField label='To' margin='dense' onChange={(e) => setTo(e.target.value)} value={to} type='date' fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm({ booked: user.displayName, from: from, to: to, bookingDate: new Date().valueOf(), orders: [] })}
          disabled={new Date(to).valueOf() < new Date(from).valueOf() || new Date(from).valueOf() < new Date().valueOf()}
          color='primary'>
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
