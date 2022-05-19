import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { MyContext } from './context';
import { useState } from 'react';

import { NavLink } from 'react-router-dom';
//import Link from "@material-ui/core/Link";

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
    underline: 'hover', //sa chi ashxatum
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [valueOfAvatar, setValueOfAvatar] = useState(false);
  const avatar = useContext(MyContext);
  function onAvatarAppear() {
    setValueOfAvatar(true); //valueOfAvatar === false? true : false
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={classes.navlinks}>
          <img
            src='https://presidenthotel.am/wp-content/uploads/2021/12/President-logo_black-4.png'
            alt='logo'
            className={classes.logo}></img>

          <nav className={classes.navlinks}>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: 'grey' }
                  : { backgroundColor: 'inherit' }
              }
              className={classes.navlinks}
              to='/'>
              Home
            </NavLink>
            <NavLink className={classes.navlinks} to='/about'>
              About us
            </NavLink>
            <MyContext.Provider value={valueOfAvatar}>
              <NavLink
                onClick={onAvatarAppear}
                className={classes.navlinks}
                to='/profile'>
                Profile
              </NavLink>{' '}
              {avatar && (
                <Avatar style={{ margin: 15 }} src='/broken-image.jpg' />
              )}
            </MyContext.Provider>

            <NavLink className={classes.navlinks} to='/auth'>
              Authentication page
            </NavLink>
            {/* <Link
              component='button'
              className={classes.navlinks}
              variant='body2'
              onClick={() => {
                console.info("I'm a button.");
              }}>
              Button Link
            </Link> */}
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}
