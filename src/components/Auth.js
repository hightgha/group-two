import { makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { HOME_ROUTE, SIGNIN_ROUTE } from '../constants/routes';
import UserContext from '../contexts/UserContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    maxWidth: 700,
  },
}));

export default function Auth() {
  const user = useContext(UserContext);
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {user ? <Navigate to={HOME_ROUTE} /> : pathname === SIGNIN_ROUTE ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
