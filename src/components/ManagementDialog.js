import React, { useContext, useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from '@material-ui/core';
import UsersTable from './UsersTable';
import HotelTable from './HotelTable';
import UserDataContext from '../contexts/UserDataContext';

export default function ManagementTable(props) {
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
      <DialogContent>
        {value === 0 && <HotelTable />}
        {value === 1 && <UsersTable />}
        {value === 2 && <UsersTable />}
      </DialogContent>
    </Dialog>
  );
}
