import { makeStyles } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Auth from './components/Auth';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

const useStyles = makeStyles({
  App: {
    textAlign: 'center',
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />+
        <Route path='/about' element={<About />} />+
        <Route path='/profile' element={<Profile />} />+
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  );
}
