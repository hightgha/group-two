import { makeStyles } from '@material-ui/core';
import Hotel from './Hotel';
import InfoCard from './InfoCard';
import { useEffect, useState } from 'react';
import { getHotelNumbers, hotelRef } from '../requests/firebase';
import { onValue } from 'firebase/database';
import FormDialog from './FormDialog';
import ManagementDialog from './ManagementDialog';
import backgroundHomeImage from './../images/backgroundHome.jpeg';
import { DEFAULT_ROOM } from '../constants/default';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '0 auto',
    width: 900,
    minHeight: 'calc(100vh - 84px)',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  '@media (max-width: 950px)': {
    container: {
      flexDirection: 'column',
      maxWidth: '90vw',
      minHeight: 'calc(100vh - 84px)',
      maxHeight: 'max-content',
    },
  },
  body: {
    backgroundImage: `url(${backgroundHomeImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  blockText: {
    display: 'block',
    margin: 8,
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
}));

export default function Home() {
  const classes = useStyles();

  const [form, setForm] = useState(false);
  const [manage, setManage] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [hotelNumbers, setHotelNumbers] = useState(Array(10).fill(Array(6).fill({ room: null, ...DEFAULT_ROOM })));

  useEffect(() => {
    getHotelNumbers().then((hotel) => {
      hotel = hotel.map((floor) => floor.map((room) => ({ ...DEFAULT_ROOM, ...room })));
      setHotelNumbers(hotel);
    });
  }, []);

  onValue(hotelRef, (snapshot) => {
    const data = snapshot.val()?.map((floor) => floor.map((roomInfo) => ({ ...DEFAULT_ROOM, ...roomInfo })));
    if (JSON.stringify(data) !== JSON.stringify(hotelNumbers)) {
      setHotelNumbers(data);
    }
  });

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <Hotel hotel={hotelNumbers} onDoorClick={() => setManage(true)} onWindowClick={(roomInfo) => setCurrentRoom(roomInfo)} />
        {form && <FormDialog onClose={() => setForm(false)} />}
        {manage && <ManagementDialog onClose={() => setManage(false)} />}
        {currentRoom && (
          <InfoCard onInfoChange={(roomInfo) => setCurrentRoom(roomInfo)} roomInfo={currentRoom} openFormDialog={() => setForm(true)} />
        )}
      </div>
    </div>
  );
}
