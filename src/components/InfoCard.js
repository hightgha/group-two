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
import PostAddIcon from '@material-ui/icons/PostAdd';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { Navigate, useNavigate } from 'react-router-dom';
import { ABOUT_ROUTE } from '../constants/routes';

const useStyles = makeStyles((theme) => ({
  root: { margin: 'auto', maxWidth: 345, backgroundColor: '#dfdfdf', border: '0.05px solid rgba(63,64,63,0.7)' },
  bottomButton: { display: 'flex', justifyContent: 'center' },
  red: { color: 'rgba(130,74,74, 0.7)' },
  green: { color: 'rgba(105,155,103, 0.8)' },
  yellow: { color: 'orange' },
  expand: { transform: 'rotate(0deg)' },
  expandOpen: { transform: 'rotate(180deg)' },
  helpIcon: { backgroundColor: 'rgba(105,155,103, 0.5)', color: 'black', border: '0.05px solid rgba(63,64,63,0.7)' },
  bookIcon: { backgroundColor: 'rgba(105,155,103, 0.5)', color: 'black', border: '0.05px solid rgba(63,64,63,0.7)' },
}));

export default function InfoCard(props) {
  const { roomInfo, onInfoChange } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showMenuDialog, setShowMenuDialog] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function addItemFromMenu(item) {
    console.log(item);
  }

  function onConfirmCancel() {
    setShowCancelDialog(false);
    setRoomInfo(roomInfo.room, { booked: null, from: null, to: null, bookingDate: null, orders: [] });
    onInfoChange({ ...{ booked: null, from: null, to: null, bookingDate: null, orders: [] }, room: roomInfo.room });
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
          title={roomInfo.room}
          subheader={`Status: ${roomInfo.booked ? 'Booked' : 'Free'}`}
          avatar={<Brightness1Icon className={roomInfo.booked ? classes.red : classes.green} />}
          action={
            (roomInfo.booked && user) || user?.displayName === roomInfo.booked ? (
              <IconButton
                onClick={() => {
                  setShowCancelDialog(true);
                }}>
                <CancelIcon />
              </IconButton>
            ) : (!roomInfo.booked && user) || (!roomInfo.booked && !user) || user?.displayName === roomInfo.booked ? (
              <IconButton
                onClick={() => {
                  setShowBookDialog(true);
                }}>
                <PostAddIcon className={classes.bookIcon} />
              </IconButton>
            ) : null
          }
        />
        <CardContent>
          {user && roomInfo.booked && user?.displayName === roomInfo.booked ? (
            <Typography paragraph>Booked by {roomInfo.booked + ' ' + roomInfo.from + ' ' + roomInfo.to}</Typography>
          ) : null}
          <Typography paragraph color='textSecondary' component='p'>
            Inchvor text
          </Typography>
        </CardContent>
        <CardActions className={classes.bottomButton}>
          {roomInfo.booked && user ? (
            <>
              <IconButton onClick={() => setExpanded(!expanded)}>
                <FormatListBulletedIcon />
              </IconButton>

              {user && (
                <IconButton onClick={() => setShowMenuDialog(true)}>
                  <AddShoppingCartIcon />
                </IconButton>
              )}
              <IconButton
                className={classes.book}
                onClick={() => {
                  setShowBookDialog(true);
                }}>
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
        {roomInfo.booked && user?.displayName === roomInfo.booked && (
          <Collapse in={expanded}>
            <List dense>
              <Divider />
              <ListItem>
                <CheckIcon className={classes.green} />
                <ListItemText primary='Apples' />
                <IconButton disabled={true} size='small'>
                  <ClearIcon />
                </IconButton>
              </ListItem>
              <ListItem>
                <AccessTimeIcon className={classes.yellow} />
                <ListItemText primary='Wine' />
                <IconButton disabled={false} size='small'>
                  <ClearIcon />
                </IconButton>
              </ListItem>
              <ListItem>
                <ClearIcon className={classes.red} />
                <ListItemText primary='Juice' />
                <IconButton disabled={true} size='small'>
                  <ClearIcon />
                </IconButton>
              </ListItem>
            </List>
          </Collapse>
        )}
      </Card>
      {showCancelDialog && (
        <CancelDialog
          handleClose={() => {
            setShowCancelDialog(false);
          }}
          onConfirm={onConfirmCancel}
        />
      )}
      {showMenuDialog && <MenuDialog handleClose={() => setShowMenuDialog(false)} onAddItem={addItemFromMenu} />}
      {showBookDialog && (
        <BookDialog
          handleClose={() => {
            setShowBookDialog(false);
          }}
          onConfirm={onConfirmBook}
        />
      )}
    </>
  );
}
