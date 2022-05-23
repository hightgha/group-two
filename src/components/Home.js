import { makeStyles } from '@material-ui/core';
import FormDialog from './FormDialog';
import Hotel from './Hotel';
import InfoCard from './InfoCard';
import { useEffect, useState } from 'react';
import { getHotelNumbers, hotelRef } from '../requests/firebase';
import { onValue } from 'firebase/database';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 30,
    margin: 'auto',
    width: 700,
  },
  blockText: {
    display: 'block',
    margin: 8,
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [formOpen, setFormOpen] = useState(false);
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
    <div>
      <div className={classes.container}>
        <Hotel hotel={hotelNumbers} onWindowClick={(roomInfo) => setCurrentRoom(roomInfo)} />
        {formOpen && <FormDialog onClose={() => setFormOpen(false)} />}
        {currentRoom && (
          <InfoCard onInfoChange={(roomInfo) => setCurrentRoom(roomInfo)} roomInfo={currentRoom} openFormDialog={() => setFormOpen(true)} />
        )}
      </div>
    </div>
  );
}
