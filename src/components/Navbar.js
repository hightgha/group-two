import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import UserContext from '../contexts/UserContext';
import { Avatar, Button } from '@material-ui/core';
import { ABOUT_ROUTE, HOME_ROUTE, PROFILE_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../constants/routes';
import { signOutUser } from '../requests/firebase';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 160,
    maxHeight: 50,
  },
  navlinks: {
    color: 'black',
    margin: 5,
    textDecoration: 'none',
  },
  button: { fontSize: 16 },
  activeLink: { textDecoration: 'underline' },
  activeAvatar: {
    borderRadius: '50%',
    boxShadow: `0px 0px 20px rgba(1, 1, 1, 0.12)`,
  },
  wrap: { marginLeft: 'auto', display: 'flex', alignItems: 'center' },
  toolbar: { margin: 'auto', display: 'flex', justifyContent: 'space-between', width: 700 },
}));

export default function Navbar() {
  const classes = useStyles();
  let user = useContext(UserContext);
  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <div>
            <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to={HOME_ROUTE}>
              <Button className={classes.button}>Home</Button>
            </NavLink>
            <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to={ABOUT_ROUTE}>
              <Button className={classes.button}>About us</Button>
            </NavLink>
          </div>
          {user ? (
            <div className={classes.wrap}>
              <Button className={classes.button} onClick={signOutUser}>
                Sign out
              </Button>
              <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeAvatar]: isActive })} to={PROFILE_ROUTE}>
                <Avatar />
              </NavLink>
            </div>
          ) : (
            <div className={classes.wrap}>
              <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to={SIGNIN_ROUTE}>
                <Button className={classes.button}>Sign in</Button>
              </NavLink>
              <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to={SIGNUP_ROUTE}>
                <Button className={classes.button}>Sign up</Button>
              </NavLink>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
