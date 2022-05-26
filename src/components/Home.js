import { makeStyles } from '@material-ui/core';
import Hotel from './Hotel';
import InfoCard from './InfoCard';
import { useEffect, useState } from 'react';
import { getHotelNumbers, hotelRef } from '../requests/firebase';
import { onValue } from 'firebase/database';
import FormDialog from './FormDialog';
import ManagementDialog from './ManagementDialog';
import backgroundHomeImage from './../images/backgroundHome.jpeg';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 30,
    margin: '0 auto',
    width: 900,
  },
  body: {
    backgroundImage: `url(${backgroundHomeImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100%',
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

  const [form, setForm] = useState(true);
  const [manage, setManage] = useState(false);

  const [currentRoom, setCurrentRoom] = useState(null);
  const [hotelNumbers, setHotelNumbers] = useState(
    Array(10).fill(Array(6).fill({ room: null, booked: null, from: null, to: null, bookingDate: null, orders: [] })),
  );

  useEffect(() => {
    getHotelNumbers().then((hotel) => {
      hotel = hotel.map((floor) => floor.map((room) => ({ booked: null, from: null, to: null, bookingDate: null, orders: [], ...room })));
      setHotelNumbers(hotel);
    });
  }, []);

  onValue(hotelRef, (snapshot) => {
    const data = snapshot
      .val()
      .map((floor) => floor.map((roomInfo) => ({ booked: null, from: null, to: null, bookingDate: null, orders: [], ...roomInfo })));
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
