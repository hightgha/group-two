import React, { useContext } from 'react';
import { makeStyles, AppBar, Toolbar, Avatar, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ABOUT_ROUTE, HOME_ROUTE, PROFILE_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../constants/routes';
import { COLOR_MOOD_GRAY } from '../constants/default';
import UserContext from '../contexts/UserContext';
import { signOutUser } from '../requests/firebase';
import avatars from '../images/avatars';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  appBar: { position: 'sticky', backgroundColor: COLOR_MOOD_GRAY },
  navlinks: { color: 'black', margin: 5, textDecoration: 'none' },
  button: { fontSize: 16 },
  activeLink: { textDecoration: 'underline' },
  activeAvatar: { borderRadius: '50%', boxShadow: `0px 0px 20px rgba(1, 1, 1, 0.12)` },
  wrap: { marginLeft: 'auto', display: 'flex', alignItems: 'center' },
  toolbar: { margin: 'auto', display: 'flex', justifyContent: 'space-between', minWidth: 900 },
  '@media (max-width: 950px)': { toolbar: { minWidth: '90vw' } },
  '@media (max-width: 350px)': { toolbar: { minWidth: 'max-content' } },
}));

export default function Navbar() {
  const classes = useStyles();
  const user = useContext(UserContext);

  return (
    <AppBar className={classes.appBar}>
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
              <Avatar src={avatars[user.photoURL]} />
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
  );
}
