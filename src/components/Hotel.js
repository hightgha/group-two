import { makeStyles, Paper } from '@material-ui/core';
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
    background: 'green',
  },
  booked: {
    background: 'red',
  },
}));

export default function Hotel() {
  const classes = useStyles();
  const [hotelNumbers, setHotelNumbers] = useState(Array(10).fill(Array(6).fill({})));

  useEffect(() => {
    console.log(hotelNumbers);
    //fetch(dasda).then(setHotelNumber);
  }, []);

  return (
    <Paper className={classes.hotel}>
      {hotelNumbers.map((flr, i) => (
        <div key={'floor' + (9 - i)} className={classes.floor}>
          {flr.map((win, j) => (
            <Paper key={'room' + (9 - i) + (j + 1)} className={clsx({ [classes.window]: true })}>
              {(9 - i) * 10 + j + 1}
            </Paper>
          ))}
        </div>
      ))}
      <Paper className={classes.door} />
    </Paper>
  );
}
