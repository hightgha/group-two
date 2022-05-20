import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Auth from './components/Auth';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import UserContext from './contexts/UserContext';
import { auth } from './requests/firebase';

const useStyles = makeStyles({
  App: {
    textAlign: 'center',
  },
});

export default function App() {
  const classes = useStyles();
  const [user, setUser] = useState(); // user - 0, staff - 1, cheif - 2
  console.log(auth);
  function userSignOut() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={user}>
      <div className={classes.App}>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signin' element={<Auth />} />
          <Route path='/signup' element={<Auth />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}
