import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, CardActions, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { Collapse, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Cancel, Create, Check, Clear, Book, Brightness1 } from '@material-ui/icons';
import { AccessTime, AddShoppingCart, FormatListBulleted, HelpOutline } from '@material-ui/icons';
import { MenuDialog, BookDialog, CancelDialog, EditDialog } from './dialogs/';
import { COLOR_GREEN, COLOR_RED, DEFAULT_ROOM } from '../constants/default';
import { ABOUT_ROUTE } from '../constants/routes';
import { Link, useNavigate } from 'react-router-dom';
import { setRoomInfo } from '../requests/firebase';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../contexts/UserContext';
import { ROOM_TYPES } from '../constants/categories';

const useStyles = makeStyles((theme) => ({
  root: { minWidth: 345, maxWidth: 345, backgroundColor: '#dfdfdf' },
  bottomButton: { display: 'flex', justifyContent: 'center' },
  red: { color: COLOR_RED },
  green: { color: COLOR_GREEN },
  yellow: { color: 'orange' },
  expand: { transform: 'rotate(0deg)' },
  expandOpen: { transform: 'rotate(180deg)' },
  link: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': { color: 'rgba(144,238,144, 1)' },
  },
  collapse: {
    maxHeight: 310,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { width: 8, background: 'none' },
    '&::-webkit-scrollbar-thumb': { background: 'grey', borderRadius: 4 },
  },
  '@media (max-width: 950px)': {
    root: { backgroundColor: '#dfdfdf', marginTop: 30 },
  },
}));

export default function InfoCard(props) {
  const { roomInfo, onInfoChange, openFormDialog } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showMenuDialog, setShowMenuDialog] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const type =
    roomInfo.room % 10 === 1 || roomInfo.room % 10 === 6
      ? ROOM_TYPES.deluxe
      : roomInfo.room % 10 === 2 || roomInfo.room % 10 === 5
      ? ROOM_TYPES.premier
      : ROOM_TYPES.executive;

  function cancelOrder(index) {
    const orders = roomInfo.orders.map((e, i) => ({ ...e, canceled: e.canceled || index === i }));
    setRoomInfo(roomInfo.room, { orders });
    onInfoChange({ ...roomInfo, orders });
  }

  function addItemsFromMenu(items) {
    const orders = [...roomInfo?.orders, ...items].map((e, ID) => ({ ...e, ID }));
    setShowMenuDialog(false);
    setRoomInfo(roomInfo.room, { orders }, roomInfo?.orders?.length);
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

  function onConfirmEdit(data) {
    setShowEditDialog(false);
    setRoomInfo(roomInfo.room, { ...roomInfo, ...data });
    onInfoChange({ ...roomInfo, ...data });
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={`Room: ${roomInfo.room}`}
          subheader={`Status: ${roomInfo.booked ? 'Booked' : 'Free'}`}
          avatar={<Brightness1 className={roomInfo.booked ? classes.red : classes.green} />}
          action={
            roomInfo.booked ? (
              <Tooltip title='Cancel' placement='left'>
                <span>
                  <IconButton disabled={roomInfo.booked !== user?.displayName} onClick={() => setShowCancelDialog(true)}>
                    <Cancel />
                  </IconButton>
                </span>
              </Tooltip>
            ) : (
              <Tooltip title='Book' placement='left'>
                <IconButton onClick={() => (user ? setShowBookDialog(true) : openFormDialog())}>
                  <Book />
                </IconButton>
              </Tooltip>
            )
          }
        />
        <CardContent>
          <Typography>{type}</Typography>
          {user?.displayName === roomInfo.booked ? (
            <Typography paragraph variant='body2'>
              <b>Booked: </b> {roomInfo.booked} <br />
              <b>From: </b> {new Date(roomInfo.from).toLocaleDateString()} <br />
              <b>To: </b> {new Date(roomInfo.to).toLocaleDateString()}
              <br />
            </Typography>
          ) : (
            <Typography paragraph color='textSecondary'>
              {'To see more information'} <br /> {' about rooms '}
              <Link className={classes.link} to={ABOUT_ROUTE} state={{ type }}>
                click here
              </Link>
            </Typography>
          )}
        </CardContent>
        <CardActions className={classes.bottomButton}>
          {user?.displayName === roomInfo.booked ? (
            <>
              <Tooltip title='Orders' placement='top'>
                <span>
                  <IconButton onClick={() => setExpanded(!expanded)} disabled={!roomInfo.orders.length}>
                    <FormatListBulleted />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title='Menu' placement='top'>
                <IconButton onClick={() => setShowMenuDialog(true)}>
                  <AddShoppingCart />
                </IconButton>
              </Tooltip>
              <Tooltip title='Edit' placement='top'>
                <IconButton onClick={() => setShowEditDialog(true)}>
                  <Create />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title='Information' placement='top'>
              <IconButton onClick={() => navigate(ABOUT_ROUTE, { state: { type } })}>
                <HelpOutline />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
        {user?.displayName === roomInfo.booked && (
          <Collapse className={classes.collapse} in={expanded}>
            <List dense>
              <Divider />
              {roomInfo.orders.map((order, index) => (
                <ListItem key={uuidv4()}>
                  {order.completed ? (
                    <Check className={classes.green} />
                  ) : order.canceled ? (
                    <Clear className={classes.red} />
                  ) : (
                    <AccessTime className={classes.yellow} />
                  )}
                  <ListItemText
                    {...{
                      primary: !order.canceled && !order.completed && order.str,
                      secondary: (order.canceled || order.completed) && order.str,
                    }}
                  />
                  <IconButton disabled={order.canceled || order.completed} onClick={() => cancelOrder(index)} size='small'>
                    <Clear />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </Card>
      {showCancelDialog && <CancelDialog handleClose={() => setShowCancelDialog(false)} onConfirm={onConfirmCancel} />}
      {showMenuDialog && <MenuDialog handleClose={() => setShowMenuDialog(false)} onAddItem={addItemsFromMenu} />}
      {showBookDialog && <BookDialog handleClose={() => setShowBookDialog(false)} onConfirm={onConfirmBook} />}
      {showEditDialog && <EditDialog handleClose={() => setShowEditDialog(false)} onConfirm={onConfirmEdit} roomInfo={roomInfo} />}
    </>
  );
}
