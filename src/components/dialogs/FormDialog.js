import React, { useContext, useState } from 'react';
import { makeStyles, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import UserContext from '../../contexts/UserContext';
import useLayout from '../../hooks/useLayout';
import ResetPassForm from '../auth/ResetPassForm';
import { DEVICES } from '../../constants/categories';

const useStyles = makeStyles({
  center: { display: 'flex', justifyContent: 'center' },
});

export default function FormDialog(props) {
  const classes = useStyles();
  const [formType, setFormType] = useState('login');
  const { onClose } = props;
  const user = useContext(UserContext);
  const device = useLayout();

  return (
    !user && (
      <Dialog open fullScreen={device !== DEVICES.desktop} onClose={onClose}>
        <DialogTitle className={classes.center}>
          <Typography variant='button'>{formType ? 'please sign in to continue' : 'please sign up to continue'}</Typography>
        </DialogTitle>
        <DialogContent>
          {formType === 'login' ? <LoginForm /> : formType === 'register' ? <RegisterForm /> : <ResetPassForm />}
        </DialogContent>
        <DialogActions className={classes.center}>
          {formType === 'login' ? (
            <>
              <Button color='secondary' size='small' onClick={() => setFormType('forgot')}>
                Forgot password
              </Button>
              <Button size='small' onClick={() => setFormType('register')} endIcon={<ArrowForward />}>
                need account? sign up!
              </Button>
            </>
          ) : (
            <Button size='small' onClick={() => setFormType('login')} startIcon={<ArrowBack />}>
              have an account? sign in
            </Button>
          )}
        </DialogActions>
      </Dialog>
    )
  );
}
