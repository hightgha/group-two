import { makeStyles } from '@material-ui/core';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ABOUT_ROUTE, HOME_ROUTE, PROFILE_ROUTE, RESET_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from './constants/routes';
import { auth, getUserData } from './requests/firebase';
import UserDataContext from './contexts/UserDataContext';
import UserContext from './contexts/UserContext';
import backgroundHomeImage from './images/';
import About from './components/About';
import Auth from './components/auth/Auth';
import Home from './components/Home';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: 'center',
    backgroundImage: `url(${backgroundHomeImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (current) => {
      if (loading) {
        setLoading(false);
      }
      getUserData(current?.displayName)
        .then((data) => setUserData(data))
        .catch(() => setUserData(null))
        .finally(() => setUser(current));
    });
    return listener;
  }, []); // eslint-disable-line

  return (
    <UserContext.Provider value={user}>
      <UserDataContext.Provider value={userData}>
        <div className={classes.App}>
          <Navbar />
          {loading && <Loader />}
          <Routes>
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path={ABOUT_ROUTE} element={<About />} />
            <Route path={PROFILE_ROUTE} element={<Profile />} />
            <Route path={SIGNIN_ROUTE} element={<Auth />} />
            <Route path={SIGNUP_ROUTE} element={<Auth />} />
            <Route path={RESET_ROUTE} element={<Auth />} />
            <Route path='*' element={<Navigate to={HOME_ROUTE} />} />
          </Routes>
        </div>
      </UserDataContext.Provider>
    </UserContext.Provider>
  );
}
