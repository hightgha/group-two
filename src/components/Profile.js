import { Button, Card, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { HOME_ROUTE } from '../constants/routes';
import UserContext from '../contexts/UserContext';
import { getUserData, sendEmailVerif } from '../requests/firebase';
const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}));
export default function Profile() {
  const user = useContext(UserContext);
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);
  useEffect(() => {
    if (user) {
      getUserData(user.displayName).then((data) => {
        setUserData(data);
      });
    }
  }, [user]);

  return user ? (
    <Card className={classes.container}>
      <Typography variant='h5'>Profile</Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Username: ${user.displayName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Display name: ${userData.displayName}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Email address: ${userData.email}`}
            secondary={
              <Typography color={user.emailVerified ? 'primary' : 'secondary'} variant='caption'>
                {'Verified status: ' + (user.emailVerified ? 'Verified' : 'Not Verified')}
              </Typography>
            }
          />
        </ListItem>
        {!user.emailVerified && (
          <Button
            disabled={buttonStatus}
            onClick={() => {
              setButtonStatus(true);
              sendEmailVerif();
            }}>
            {!buttonStatus ? 'Send Email Verification' : 'Email Verification Sended'}
          </Button>
        )}
        <ListItem>
          <ListItemText primary={`Gender: ${userData.gender === 'm' ? 'Male' : 'Female'}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Account created at: ${user.metadata.creationTime.slice(0, -4)}`} />
        </ListItem>
      </List>
    </Card>
  ) : (
    <Navigate to={HOME_ROUTE} />
  );
}
