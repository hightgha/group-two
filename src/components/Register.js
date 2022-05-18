import { Button, makeStyles, TextField } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  formWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 256,
    margin: 'auto',
  },
  field: {
    margin: theme.spacing(1),
    minWidth: 256,
  },
}));

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const classes = useStyles();
  const { onSwitch, onRegister } = props;

  return (
    <>
      <h3>Register page</h3>
      <div className={classes.formWrap}>
        <TextField
          className={classes.field}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          label='username'
          variant='outlined'
        />
        <TextField
          className={classes.field}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          label='email address'
          variant='outlined'
        />
        <TextField
          className={classes.field}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          label='password'
          variant='outlined'
        />
        <TextField
          className={classes.field}
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
          label='repeat password'
          variant='outlined'
        />
        <Button size='small' onClick={(e) => onSwitch(false)} endIcon={<ArrowForwardIcon />}>
          have an account? sign in
        </Button>
        <Button variant='outlined' onClick={() => onRegister({ username, email, password, rePassword })}>
          Sign up
        </Button>
      </div>
    </>
  );
}
