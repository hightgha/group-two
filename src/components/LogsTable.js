import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { makeStyles } from '@material-ui/core';
import { getLogs } from '../requests/firebase';

const useStyles = makeStyles(() => ({
  size: { width: 500, height: 500, border: '1px solid rgba(1, 1, 1, 0.1)' },
}));

export default function LogsTable() {
  const [rowData, setRowData] = useState();

  const classes = useStyles();
  const [columnDefs] = useState([
    {
      field: 'logged at',
      width: 185,
      cellRenderer: ({ data: { logged } }) => new Date(logged).toUTCString().slice(0, -4),
    },
    { field: 'roomNumber', width: 75 },
    {
      field: 'action',
      width: 150,
      cellRenderer: ({ data: { booked, orders } }) => booked || (orders?.length && 'order changed') || 'unbooked',
    },
    {
      field: 'orders',
      width: 100,
      cellRenderer: ({ data: { orders } }) => orders?.length,
    },
    { field: 'duration (From / To)', width: 190, cellRenderer: ({ data: { from, to } }) => (from ? from + ' / ' + to : '-') },
  ]);

  useEffect(() => {
    getLogs().then((data) => setRowData(Object.values(data).sort((a, b) => b.logged - a.logged)));
  }, []);

  const getRowStyle = ({ data }) => {
    return { backgroundColor: data.booked || data.orders ? 'rgba(240,128,128, 0.2)' : 'rgba(144,238,144, 0.2)' };
  };

  const defaultColDef = { resizable: true, sortable: true };

  return (
    <>
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
    </>
  );
}
