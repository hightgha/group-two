import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 160,
  },

  navlinks: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
    margin: 15,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <img
            src='https://presidenthotel.am/wp-content/uploads/2021/12/President-logo_black-4.png'
            alt='logo'
            className={classes.logo}></img>

          <nav className={classes.navlinks}>
            <NavLink className={classes.navlinks} to='/'>
              Home
            </NavLink>
            <NavLink className={classes.navlinks} to='/about'>
              About us
            </NavLink>
            <NavLink className={classes.navlinks} to='/profile'>
              Profile
            </NavLink>

            <NavLink className={classes.navlinks} to='/auth'>
              Authentication page
            </NavLink>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}
