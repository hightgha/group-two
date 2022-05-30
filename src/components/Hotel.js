import { Button, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { useContext } from 'react';
import UserDataContext from '../contexts/UserDataContext';
import { COLOR_GREEN, COLOR_MOOD_GRAY, COLOR_LIGHT_GRAY } from '../constants/default';

const useStyles = makeStyles((theme) => ({
  hotel: { width: 264, height: 540, backgroundColor: COLOR_LIGHT_GRAY, padding: 8 },
  door: { width: 32, height: 64, margin: 'auto', minWidth: 32, backgroundColor: COLOR_MOOD_GRAY },
  room: { minWidth: 28, minHeight: 32, padding: 0, margin: 0 },
  window: { width: 28, height: 32, margin: 8 },
  floor: { display: 'flex' },
  free: { background: COLOR_GREEN },
  booked: { background: COLOR_MOOD_GRAY },
  reverse: { display: 'flex', flexDirection: 'column-reverse' },
}));

export default function Hotel(props) {
  const classes = useStyles();
  const { hotel, onWindowClick, onDoorClick } = props;
  const userData = useContext(UserDataContext);

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
                <Button onClick={() => onWindowClick(roomInfo)} className={classes.room}>
                  {roomInfo.room}
                </Button>
              </Paper>
            ))}
          </div>
        ))}
      </div>
      <Paper className={classes.door}>
        {userData?.permission === 'staff' || userData?.permission === 'owner' ? (
          <Button className={classes.door} onClick={onDoorClick} />
        ) : (
          <Button className={classes.door} />
        )}
      </Paper>
    </Paper>
  );
}
