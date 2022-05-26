import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import { DialogTitle } from '@material-ui/core';

export default function EditDialog(props) {
  const [to, setTo] = useState('');
  const { handleClose, onConfirm, roomInfo } = props;
  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Editing</DialogTitle>
      <DialogContent>
        <DialogContentText>You can only change booking second date</DialogContentText>
        <TextField margin='dense' onChange={(e) => setTo(e.target.value)} value={to} type='date' fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={() => onConfirm({ to })} disabled={new Date(to).valueOf() < new Date(roomInfo.from).valueOf()} color='primary'>
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
