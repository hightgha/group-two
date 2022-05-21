import { Button, makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HOME_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../constants/routes';
import UserContext from '../contexts/UserContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    maxWidth: 700,
  },
}));

export default function Auth() {
  const user = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {user ? (
        <Navigate to={HOME_ROUTE} />
      ) : pathname === SIGNIN_ROUTE ? (
        <>
          <LoginForm />
          <Button size='small' onClick={(e) => navigate(SIGNUP_ROUTE)} endIcon={<ArrowForwardIcon />}>
            need account? sign up!
          </Button>
        </>
      ) : (
        <>
          <RegisterForm />
          <Button size='small' onClick={(e) => navigate(SIGNIN_ROUTE)} startIcon={<ArrowBackIcon />}>
            have an account? sign in
          </Button>
        </>
      )}
    </div>
  );
}
