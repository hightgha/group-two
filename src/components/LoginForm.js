import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { getUserData, sendResetPassword, signInUser } from '../requests/firebase';

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

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [reset, setReset] = useState(false);
  const [resetInfo, setResetInfo] = useState('');
  const classes = useStyles();

  async function onLogin() {
    let login = username;
    if (
      !username.includes('@') &&
      !username.includes('.') &&
      !username.includes('#') &&
      !username.includes('$') &&
      !username.includes('[') &&
      !username.includes(']')
    ) {
      const data = await getUserData(username);
      let email = data?.email;
      if (!email) {
        setUsernameError('Incorrect email or username.');
        setReset(true);
        return;
      }
      login = email;
    }
    const result = await signInUser(login, password);
    if (result.code) {
      if (result.code === 'auth/wrong-password') {
        setPasswordError('Wrong password');
        setReset(true);
        return;
      }
      setUsernameError('User not found. Incorrect username');
      setReset(true);
      return;
    }
    return true;
  }
  async function resetPassword() {
    const result = await sendResetPassword(username);
    setResetInfo(result);
  }

  return (
    <>
      <div className={classes.formWrap}>
        <TextField
          className={classes.field}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (usernameError) setUsernameError('');
          }}
          required
          label='username'
          variant='outlined'
          error={(!!username && username.length < 3) || !!usernameError}
          helperText={usernameError}
        />
        <TextField
          className={classes.field}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError('');
          }}
          required
          type='password'
          label='password'
          variant='outlined'
          error={(!!password && password.length < 6) || !!passwordError}
          helperText={passwordError}
        />
        {reset && <Button onClick={resetPassword}>Reset password</Button>}
        {resetInfo && (
          <Typography variant='subtitle2' color={resetInfo.includes('sended') ? 'primary' : 'secondary'}>
            {resetInfo}
          </Typography>
        )}
        <Button onClick={onLogin} variant='outlined' disabled={username.length < 3 || password.length < 6}>
          Sign in
        </Button>
      </div>
    </>
  );
}
