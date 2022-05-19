import { Button, makeStyles, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const { onSwitch, onLogin } = props;

  return (
    <>
      <h3>Login page</h3>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          label='password'
          variant='outlined'
        />
        <Button size='small' onClick={(e) => onSwitch(true)} startIcon={<ArrowBackIcon />}>
          need account? sign up!
        </Button>
        <Button onClick={() => onLogin({ username, password })} variant='outlined'>
          Sign in
        </Button>
      </div>
    </>
  );
}
