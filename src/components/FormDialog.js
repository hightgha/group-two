import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function FormDialog(props) {
  const classes = useStyles();
  const [formType, setFormType] = useState(false);
  const { onClose } = props;
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle className={classes.center}>
        <Typography variant='button'>{formType ? 'please sign in to continue' : 'please sign up to continue'}</Typography>
      </DialogTitle>
      <DialogContent>{formType ? <LoginForm /> : <RegisterForm />}</DialogContent>
      <DialogActions className={classes.center}>
        {formType ? (
          <Button size='small' onClick={() => setFormType(false)} endIcon={<ArrowForwardIcon />}>
            need account? sign up!
          </Button>
        ) : (
          <Button size='small' onClick={() => setFormType(true)} startIcon={<ArrowBackIcon />}>
            have an account? sign in
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
