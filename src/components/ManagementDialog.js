import React, { useContext, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, makeStyles, Tab, Tabs } from '@material-ui/core';
import UserDataContext from '../contexts/UserDataContext';
import UsersTable from './UsersTable';
import HotelTable from './HotelTable';
import LogsTable from './LogsTable';

const useStyles = makeStyles({
  root: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'none',
    },
  },
});

export default function ManagementTable(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { onClose } = props;
  const userData = useContext(UserDataContext);
  const permission = userData?.permission;
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        Management Dialog
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
