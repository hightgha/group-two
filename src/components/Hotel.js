import { Button, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  hotel: {
    width: 264,
    height: 540,
    backgroundColor: '#dfdfdf',
    padding: 8,
  },
  window: {
    width: 28,
    height: 32,
    margin: 8,
  },
  floor: {
    display: 'flex',
  },
  door: {
    width: 32,
    height: 64,
    margin: 'auto',
  },
  free: {
    background: 'rgba(144,238,144, 0.8)', // green
  },
  booked: {
    background: 'rgba(240,128,128, 0.8)', // red
  },
  roomButton: {
    minWidth: 28,
    minHeight: 32,
    padding: 0,
    margin: 0,
  },
}));

export default function Hotel() {
  const classes = useStyles();
  const [hotelNumbers, setHotelNumbers] = useState(
    Array(10).fill(
      Array(6).fill({
        room: 0,
        booked: null,
        from: null,
        to: null,
        bookingDate: null,
        orders: [
          {
            completed: false,
            canceled: false,
            title: 'apple',
            created: '#server time string#',
          },
        ],
      }),
    ),
  );
  useEffect(() => {
    console.log(hotelNumbers);
    //fetch(dasda).then(setHotelNumber);
  }, []);
  function hotelRoomClick(floor, room) {
    console.log(floor, room);
  }

  return (
    <Paper className={classes.hotel}>
      {hotelNumbers.map((flr, i) => (
        <div key={'floor' + (9 - i)} className={classes.floor}>
          {flr.map((win, j) => (
            <Paper
              key={'room' + (9 - i) + (j + 1)}
              className={clsx({
                [classes.window]: true,
              })}>
              <Button onClick={() => hotelRoomClick(9 - i, j)} className={classes.roomButton}>
                {(9 - i) * 10 + j + 1}
              </Button>
            </Paper>
          ))}
        </div>
      ))}
      <Paper className={classes.door} />
    </Paper>
  );
}
