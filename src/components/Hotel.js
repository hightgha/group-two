import { Button, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';

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
  reverse: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
}));

export default function Hotel(props) {
  const classes = useStyles();
  const { hotel, onWindowClick } = props;

  return (
    <Paper className={classes.hotel}>
      <div className={classes.reverse}>
        {hotel.map((floor, i) => (
          <div key={'floor' + (9 - i)} className={classes.floor}>
            {floor.map((roomInfo, j) => (
              <Paper
                key={'room' + (9 - i) + (j + 1)}
                className={clsx({
                  [classes.window]: true,
                  [classes.booked]: roomInfo.booked,
                  [classes.free]: !roomInfo.booked,
                })}>
                <Button onClick={() => onWindowClick(roomInfo)} className={classes.roomButton}>
                  {roomInfo.room}
                </Button>
              </Paper>
            ))}
          </div>
        ))}
      </div>
      <Paper className={classes.door} />
    </Paper>
  );
}
