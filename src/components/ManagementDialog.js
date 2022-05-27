import React, { useContext, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, makeStyles, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import UserDataContext from '../contexts/UserDataContext';
import UsersTable from './UsersTable';
import HotelTable from './HotelTable';
import LogsTable from './LogsTable';

const useStyles = makeStyles({
  root: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      background: 'white',
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'black',
      width: 8,
      borderRadius: 4,
    },
  },
});

export default function ManagementTable(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { onClose } = props;
  const userData = useContext(UserDataContext);
  const permission = userData?.permission;
  const fullScreen = useMediaQuery('@media (max-width: 950px)');

  return (
    <Dialog open fullScreen={fullScreen} onClose={onClose}>
      <DialogTitle>
        Management Dialog
        {fullScreen && <Button onClick={onClose}>Close</Button>}
        <Tabs centered value={value} indicatorColor='primary' textColor='primary' onChange={(e, value) => setValue(value)}>
          <Tab label='Numbers / Orders' />
          <Tab label='Logs' disabled={permission !== 'cheif'} />
          <Tab label='Users' disabled={permission !== 'cheif'} />
        </Tabs>
      </DialogTitle>
      <DialogContent className={classes.root}>
        {value === 0 && <HotelTable />}
        {value === 1 && <LogsTable />}
        {value === 2 && <UsersTable />}
      </DialogContent>
    </Dialog>
  );
}
