import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { sendResetPassword } from '../../requests/firebase';
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

export default function ResetPassForm() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [resetInfo, setResetInfo] = useState('');
  const classes = useStyles();

  async function resetPassword() {
    const result = await sendResetPassword(username);
    setResetInfo(result);
  }

  return (
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
      <Button variant='outlined' onClick={resetPassword}>
        Reset password
      </Button>
      {resetInfo && (
        <Typography variant='subtitle2' color={resetInfo.includes('sended') ? 'primary' : 'secondary'}>
          {resetInfo}
        </Typography>
      )}
    </div>
  );
}
