import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import UserContext from '../contexts/UserContext';

export default function BooklIconDialog(props) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const user = useContext(UserContext);
  const { handleClose, onConfirm } = props;
  console.log(user);
  return (
    <Dialog open onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogContent>
        {user ? (
          <DialogContentText>Please enter how long you are going to be here</DialogContentText>
        ) : (
          <DialogContentText>Please Sign in for the first</DialogContentText>
        )}

        {user && (
          <TextField
            onChange={(e) => {
              setFrom(e.target.value);
            }}
            value={from}
            margin='dense'
            type='date'
            fullWidth
          />
        )}
        {user && (
          <TextField
            onChange={(e) => {
              setTo(e.target.value);
            }}
            value={to}
            margin='dense'
            type='date'
            fullWidth
          />
        )}
      </DialogContent>
      <DialogActions>
        {user && (
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        )}
        {user && (
          <Button
            onClick={() =>
              onConfirm({
                booked: user?.displayName,
                from: from, //new Date(from).valueOf(),
                to: to, //new Date(to).valueOf(),
                bookingDate: new Date().valueOf(),
                orders: [],
              })
            }
            color='primary'
            disabled={new Date(to).valueOf() < new Date(from).valueOf() || new Date(from).valueOf() < new Date().valueOf()}>
            confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
