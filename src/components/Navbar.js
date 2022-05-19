import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 160,
  },
  navlinks: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black',
    margin: 15,
    textDecoration: 'none',
  },
  activeLink: {
    color: 'white',
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <img
          src='https://presidenthotel.am/wp-content/uploads/2021/12/President-logo_black-4.png'
          alt='logo'
          className={classes.logo}></img>

        <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to='/'>
          Home
        </NavLink>
        <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to='/about'>
          About us
        </NavLink>
        <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to='/profile'>
          Profile
        </NavLink>
        <NavLink className={({ isActive }) => clsx(classes.navlinks, { [classes.activeLink]: isActive })} to='/auth'>
          Sign in/up
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
