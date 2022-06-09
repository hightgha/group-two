import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { makeStyles } from '@material-ui/core';
import { changeUserInfo, getUsersList } from '../../requests/firebase';

const useStyles = makeStyles({
  size: { width: '95vw', height: 500, border: '1px solid rgba(1, 1, 1, 0.1)' },
});

export default function UsersTable() {
  const classes = useStyles();
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: 'username', pinned: 'left', width: 110 },
    {
      field: 'permission',
      flex: 1,
      editable: true,
      valueGetter: (params) => params.data.permission,
      valueSetter: (params) => {
        if (['user', 'staff', 'owner'].includes(params.newValue) && params.oldValue !== params.newValue) {
          changeUserInfo(params.data.username, 'permission', params.newValue);
          params.data.permission = params.newValue;
        }
      },
      cellStyle: ({ value }) => {
        if (value === 'staff' || value === 'owner') {
          return { fontWeight: 'bold' };
        }
      },
    },
    { field: 'displayName', flex: 1 },
    { field: 'email', flex: 1 },
    { field: 'gender', flex: 1, cellRenderer: ({ data: { gender } }) => (gender === 'm' ? 'Male' : 'Female') },
    { field: 'avatar', flex: 1 },
  ]);

  useEffect(() => {
    getUsersList().then((data) => setRowData(Object.values(data)));
  }, []);

  const getRowStyle = ({ data: { permission } }) => {
    if (permission === 'owner') return { backgroundColor: 'rgba(240,128,128, 0.5)' };
    if (permission === 'staff') return { backgroundColor: 'rgba(144,238,144, 0.5)' };
  };

  const defaultColDef = { resizable: true, sortable: true };

  return (
    <div className={`${classes.size} ag-theme-material`}>
      <AgGridReact
        animateRows='true'
        enableRangeSelection='true'
        rowSelection='multiple'
        suppressRowClickSelection='true'
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle}
      />
    </div>
  );
}
