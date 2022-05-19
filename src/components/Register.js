import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
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
  select: {
    textAlign: 'left',
  },
}));

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [gender, setGender] = useState('');
  const classes = useStyles();
  const { onSwitch, onRegister } = props;

  function submitRegister() {
    let valid = true;
    // checks, when if need on Register
    if (valid) {
      onRegister({ username, email, password, rePassword, displayName, gender });
    }
  }
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
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          label='full name'
          variant='outlined'
          helperText='Name Surname'
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
          endIcon={'asd'}
        />
        <TextField
          className={classes.field}
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
          label='repeat password'
          variant='outlined'
        />
        <FormControl variant='outlined' className={classes.field}>
          <InputLabel required>Gender</InputLabel>
          <Select className={classes.select} value={gender} onChange={(e) => setGender(e.target.value)} label='Gendera'>
            <MenuItem value={'m'}>Men</MenuItem>
            <MenuItem value={'w'}>Women</MenuItem>
          </Select>
        </FormControl>
        <Button size='small' onClick={(e) => onSwitch(false)} endIcon={<ArrowForwardIcon />}>
          have an account? sign in
        </Button>
        <Button variant='outlined' onClick={submitRegister}>
          Sign up
        </Button>
      </div>
    </>
  );
}
