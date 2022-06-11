import { Button, Card, makeStyles, Typography } from '@material-ui/core';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HOME_ROUTE, RESET_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../../constants/routes';
import { ArrowBack, ArrowForward } from '@material-ui/icons/';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPassForm from './ResetPassForm';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    background: 'white',
    padding: 20,
  },
}));

export default function Auth() {
  const user = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      {user ? (
        <Navigate to={HOME_ROUTE} />
      ) : pathname === SIGNIN_ROUTE ? (
        <>
          <Typography variant='h6'>SIGN IN</Typography>
          <LoginForm />
          <Button color='secondary' size='small' onClick={() => navigate(RESET_ROUTE)}>
            Forgot password
          </Button>
          <Button size='small' onClick={(e) => navigate(SIGNUP_ROUTE)} endIcon={<ArrowForward />}>
            need account? sign up!
          </Button>
        </>
      ) : pathname === SIGNUP_ROUTE ? (
        <>
          <Typography variant='h6'>SIGN UP</Typography>
          <RegisterForm />
          <Button size='small' onClick={(e) => navigate(SIGNIN_ROUTE)} startIcon={<ArrowBack />}>
            have an account? sign in
          </Button>
        </>
      ) : (
        <>
          <Typography variant='h6'>RESET PASSWORD</Typography>
          <ResetPassForm />
          <Button size='small' onClick={(e) => navigate(SIGNIN_ROUTE)} startIcon={<ArrowBack />}>
            have an account? sign in
          </Button>
          <Button size='small' onClick={(e) => navigate(SIGNUP_ROUTE)} endIcon={<ArrowForward />}>
            need account? sign up!
          </Button>
        </>
      )}
    </Card>
  );
}
