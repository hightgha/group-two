import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

export default function App() {
  return (
    <div className='App'>
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
