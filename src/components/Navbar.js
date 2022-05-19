import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import UserContext from '../contexts/UserContext';
import { Avatar, Button } from '@material-ui/core';

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
            <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to='/'>
              <Button className={classes.button}>Home</Button>
            </NavLink>
            <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to='/about'>
              <Button className={classes.button}>About us</Button>
            </NavLink>
          </div>
          {user ? (
            <div className={classes.wrap}>
              <Button className={classes.button}>Sign out</Button>
              <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeAvatar]: isActive })} to='/profile'>
                <Avatar className={classes.avatar} />
              </NavLink>
            </div>
          ) : (
            <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to='/auth'>
              <Button className={classes.button}>Sign in / up</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
