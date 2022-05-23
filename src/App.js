import { makeStyles } from '@material-ui/core';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Auth from './components/Auth';
import Home from './components/Home';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import { ABOUT_ROUTE, HOME_ROUTE, PROFILE_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from './constants/routes';
import UserContext from './contexts/UserContext';
import UserDataContext from './contexts/UserDataContext';
import { auth, getUserData } from './requests/firebase';

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: 'center',
  },
}));

export default function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  console.log(user, userData);
  onAuthStateChanged(auth, (data) => {
    if (loading) {
      setLoading(false);
    }
    if (data !== user) {
      setUser(data);
    }
  });
  useEffect(() => {
    if (user) {
      getUserData(user.displayName).then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(userData)) {
          setUserData(data);
        }
      });
    } else {
      setUserData(null);
    }
  }, [user]);
  return (
    <>
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
              <Route path='*' element={<Navigate to={HOME_ROUTE} />} />
            </Routes>
          </div>
        </UserDataContext.Provider>
      </UserContext.Provider>
    </>
  );
}
