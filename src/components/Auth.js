import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    maxWidth: 1024,
  },
}));

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const classes = useStyles();

  function onSwitch() {
    setIsLogin(!isLogin);
  }
  function onLogin(data) {
    // inchvor checker, heto login - database
    console.log(data);
  }
  function onRegister(data) {
    // inchvor checker, heto register - database
    console.log(data);
  }

  return (
    <div className={classes.container}>
      <h1>Authentication page</h1>
      {isLogin ? <Login onSwitch={onSwitch} onLogin={onLogin} /> : <Register onSwitch={onSwitch} onRegister={onRegister} />}
    </div>
  );
}
