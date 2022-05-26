import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core';
import { Collapse, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CreateIcon from '@material-ui/icons/Create';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import MenuDialog from './MenuDialog';
import BookDialog from './BookDialog';
import CancelDialog from './CancelDialog';
import UserContext from '../contexts/UserContext';
import { setRoomInfo } from '../requests/firebase';
import { ABOUT_ROUTE } from '../constants/routes';
import { Link } from 'react-router-dom';
import { DEFAULT_ROOM } from '../constants/default';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: { margin: 'auto', maxWidth: 345, minWidth: 345 },
  bottomButton: { display: 'flex', justifyContent: 'center' },
  red: { color: 'rgba(240,128,128, 1)' },
  green: { color: 'rgba(144,238,144, 1)' },
  yellow: { color: 'orange' },
  expand: { transform: 'rotate(0deg)' },
  expandOpen: { transform: 'rotate(180deg)' },
  link: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      color: 'rgba(144,238,144, 1)',
    },
  },
  collapse: {
    maxHeight: 310,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'none',
    },
  },
}));

export default function InfoCard(props) {
  const { roomInfo, onInfoChange, openFormDialog } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showMenuDialog, setShowMenuDialog] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function cancelOrder(index) {
    const orders = roomInfo.orders.map((e, i) => ({ ...e, canceled: e.canceled || index === i }));
    setRoomInfo(roomInfo.room, { orders });
    onInfoChange({ ...roomInfo, orders });
  }

  function addItemFromMenu(items) {
    const orders = [...roomInfo?.orders, ...items];
    setShowMenuDialog(false);
    setRoomInfo(roomInfo.room, { orders });
    onInfoChange({ ...roomInfo, orders });
  }

  function onConfirmCancel() {
    setShowCancelDialog(false);
    setRoomInfo(roomInfo.room, DEFAULT_ROOM);
    onInfoChange({ room: roomInfo.room, ...DEFAULT_ROOM });
  }

  function onConfirmBook(data) {
    setShowBookDialog(false);
    setRoomInfo(roomInfo.room, data);
    onInfoChange({ ...data, room: roomInfo.room });
  }
  //
  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={`Room: ${roomInfo.room}`}
          subheader={`Status: ${roomInfo.booked ? 'Booked' : 'Free'}`}
          avatar={<Brightness1Icon className={roomInfo.booked ? classes.red : classes.green} />}
          action={
            roomInfo.booked ? (
              <IconButton disabled={roomInfo.booked !== user?.displayName} onClick={() => setShowCancelDialog(true)}>
                <CancelIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => (user ? setShowBookDialog(true) : openFormDialog())}>
                <BookIcon />
              </IconButton>
            )
          }
        />
        <CardContent>
          <Typography>
            {(roomInfo.room % 10 === 1 || roomInfo.room % 10 === 6) && 'DELUXE'}
            {(roomInfo.room % 10 === 2 || roomInfo.room % 10 === 5) && 'VIP'}
            {(roomInfo.room % 10 === 3 || roomInfo.room % 10 === 4) && 'STANDART'}
          </Typography>
          {user?.displayName === roomInfo.booked ? (
            <Typography paragraph variant='body2'>
              <b>Booked: </b> {roomInfo.booked} <br />
              <b>From: </b> {new Date(roomInfo.from).toLocaleDateString()} <br />
              <b>To: </b> {new Date(roomInfo.to).toLocaleDateString()}
              <br />
            </Typography>
          ) : (
            <Typography paragraph color='textSecondary'>
              {'To see more information'}
              <br />
              {' about rooms '}
              <Link className={classes.link} to={ABOUT_ROUTE}>
                click here
              </Link>
            </Typography>
          )}
        </CardContent>
        <CardActions className={classes.bottomButton}>
          {user?.displayName === roomInfo.booked ? (
            <>
              <IconButton onClick={() => setExpanded(!expanded)}>
                <FormatListBulletedIcon />
              </IconButton>

              <IconButton onClick={() => setShowMenuDialog(true)}>
                <AddShoppingCartIcon />
              </IconButton>
              <IconButton onClick={() => setShowBookDialog(true)}>
                <CreateIcon />
              </IconButton>
            </>
          ) : (
            <IconButton>
              <HelpOutlineOutlinedIcon
                className={classes.helpIcon}
                onClick={() => {
                  navigate(ABOUT_ROUTE);
                }}
              />
            </IconButton>
          )}
        </CardActions>
        {user?.displayName === roomInfo.booked && (
          <Collapse className={classes.collapse} in={expanded}>
            <List dense>
              <Divider />
              {roomInfo.orders.map((order, index) => (
                <ListItem key={uuidv4()}>
                  {order.completed ? (
                    <CheckIcon className={classes.green} />
                  ) : order.canceled ? (
                    <ClearIcon className={classes.red} />
                  ) : (
                    <AccessTimeIcon className={classes.yellow} />
                  )}
                  <ListItemText secondary={order.str} />
                  <IconButton disabled={order.canceled || order.completed} onClick={() => cancelOrder(index)} size='small'>
                    <ClearIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </Card>
      {showCancelDialog && <CancelDialog handleClose={() => setShowCancelDialog(false)} onConfirm={onConfirmCancel} />}
      {showMenuDialog && <MenuDialog handleClose={() => setShowMenuDialog(false)} onAddItem={addItemFromMenu} />}
      {showBookDialog && <BookDialog handleClose={() => setShowBookDialog(false)} onConfirm={onConfirmBook} />}
    </>
  );
}
