import { Divider, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { HOME_ROUTE } from '../constants/routes';
import UserContext from '../contexts/UserContext';
const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    minWidth: 700,
  },
}));
export default function Profile() {
  const user = useContext(UserContext);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {user ? (
        <List>
          <ListItem>
            <Typography>Username: {user.username}</Typography>
          </ListItem>
          <ListItem>
            <Typography>Display name: {user.displayName}</Typography>
          </ListItem>
          <ListItem>
            <Typography>Email address: {user.email}</Typography>
          </ListItem>
          <ListItem>
            <Typography>Gender: {user.gender}</Typography>
          </ListItem>
          {user.accessLvl > 0 && (
            <div>
              <Divider />
              <Typography variant='h6'>Management window</Typography>
              <div>Info about rooms</div>
            </div>
          )}
          {user.accessLvl > 1 && (
            <div>
              <Divider />
              <Typography variant='h6'>Cheif window</Typography>
              <div>Logs here</div>
            </div>
          )}
        </List>
      ) : (
        <Navigate to={HOME_ROUTE} />
      )}
    </div>
  );
}
