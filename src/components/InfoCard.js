import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core';
import { Collapse, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import CancelIcon from '@material-ui/icons/Cancel';
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles((theme) => ({
  root: { margin: 'auto', maxWidth: 345 },
  bottomButton: { display: 'flex', justifyContent: 'center' },
  red: { color: 'red' },
  green: { color: 'green' },
  yellow: { color: 'orange' },
  expand: { transform: 'rotate(0deg)' },
  expandOpen: { transform: 'rotate(180deg)' },
}));

export default function InfoCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const booked = true; // booked jamanakavor a, heto petqa propsov liqy ban ga

  return (
    <Card className={classes.root}>
      <CardHeader
        title='Floor 9 - Room 91'
        subheader={`Status: ${booked ? 'Booked' : 'Free'}`}
        avatar={<Brightness1Icon className={booked ? classes.red : classes.green} />}
        action={
          booked ? (
            <IconButton>
              <CancelIcon />
            </IconButton>
          ) : (
            <IconButton>
              <BookIcon />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Typography paragraph>
          Booked by Name Surname. <br /> 20.05.2022 - 30.05.2022
        </Typography>
        <Typography paragraph color='textSecondary' component='p'>
          Inchvor text
        </Typography>
      </CardContent>
      <CardActions className={classes.bottomButton}>
        {booked ? (
          <>
            <IconButton onClick={() => setExpanded(!expanded)}>
              <FormatListBulletedIcon />
            </IconButton>
            <IconButton>
              <AddShoppingCartIcon />
            </IconButton>
            <IconButton>
              <CreateIcon />
            </IconButton>
          </>
        ) : (
          <IconButton>
            <InfoIcon />
          </IconButton>
        )}
      </CardActions>
      {booked && (
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
  );
}
