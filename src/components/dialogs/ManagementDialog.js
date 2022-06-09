import React, { useContext, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, makeStyles, Tab, Tabs } from '@material-ui/core';
import UserDataContext from '../../contexts/UserDataContext';
import { UsersTable, HotelTable, LogsTable } from '../tables/';

const useStyles = makeStyles({
  root: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { background: 'white', width: 8 },
    '&::-webkit-scrollbar-thumb': { background: 'black', width: 8, borderRadius: 4 },
  },
});

export default function ManagementDialog(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { onClose } = props;
  const userData = useContext(UserDataContext);
  const permission = userData?.permission;

  return (
    <Dialog open fullScreen onClose={onClose}>
      <DialogTitle>
        Management Dialog
        <Button onClick={onClose}>Close</Button>
        <Tabs centered value={value} indicatorColor='primary' textColor='primary' onChange={(e, value) => setValue(value)}>
          <Tab label='Numbers / Orders' />
          <Tab label='Logs' disabled={permission !== 'owner'} />
          <Tab label='Users' disabled={permission !== 'owner'} />
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
