import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@material-ui/core';

export default function EditDialog(props) {
  const [to, setTo] = useState('');
  const { handleClose, onConfirm, roomInfo } = props;
  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Editing room {roomInfo.room}</DialogTitle>
      <DialogContent>
        <DialogContentText>You can only change booking second date</DialogContentText>
        <TextField margin='dense' helperText='to' onChange={(e) => setTo(e.target.value)} value={to} type='date' fullWidth />
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