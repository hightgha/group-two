import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useState } from 'react';
import { createUser, getUserData, writeUserData, updateUserData, sendEmailVerif } from '../requests/firebase';

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
  select: {
    textAlign: 'left',
  },
}));
export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [gender, setGender] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const classes = useStyles();
  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }
  async function onRegister() {
    const result = await getUserData(username);
    if (!result) {
      let avatar = Math.round(Math.random() * 4);
      await createUser(email, password);
      await writeUserData({ username, email, displayName, gender, avatar });
      await updateUserData(username, gender + avatar);
      await sendEmailVerif();
      return true;
    }
    setUsernameError('Please use another username');
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
        helperText={usernameError}
        error={(!!username && username.length < 3) || !!usernameError}
      />
      <TextField
        className={classes.field}
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
        label='full name'
        variant='outlined'
        helperText='Name Surname'
        error={!!displayName && displayName.length < 3}
      />
      <TextField
        className={classes.field}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        label='email address'
        variant='outlined'
        error={!!email && !validateEmail(email)}
      />
      <TextField
        className={classes.field}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        label='password'
        variant='outlined'
        error={!!password && password.length < 6}
      />
      <TextField
        className={classes.field}
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        required
        label='repeat password'
        variant='outlined'
        error={!!rePassword && rePassword !== password}
      />
      <FormControl variant='outlined' className={classes.field}>
        <InputLabel required>Gender</InputLabel>
        <Select className={classes.select} value={gender} onChange={(e) => setGender(e.target.value)} label='Gender_'>
          <MenuItem value='m'>Men</MenuItem>
          <MenuItem value='w'>Women</MenuItem>
        </Select>
      </FormControl>

      <Button
        disabled={
          !!(
            username.length < 3 ||
            displayName.length < 3 ||
            password.length < 6 ||
            password !== rePassword ||
            !gender ||
            !validateEmail(email)
          )
        }
        variant='outlined'
        onClick={onRegister}>
        Sign up
      </Button>
    </div>
  );
}
