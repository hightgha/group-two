import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { makeStyles } from '@material-ui/core';
import { getLogs } from '../../requests/firebase';

const useStyles = makeStyles(() => ({
  size: { width: '95vw', height: 500, border: '1px solid rgba(1, 1, 1, 0.1)' },
}));

export default function LogsTable() {
  const [rowData, setRowData] = useState();
  const classes = useStyles();
  const [columnDefs] = useState([
    {
      field: 'Logged at',
      pinned: 'left',
      width: 200,
      cellRenderer: ({ data: { logged } }) => new Date(logged).toUTCString().slice(0, -4),
    },
    { field: 'room', flex: 1 },
    {
      field: 'action',
      flex: 1,
      cellRenderer: ({ data: { booked, orders, action, order } }) =>
        (booked && `Booked ${booked}`) || (orders?.length && 'Orders added') || (action && `Order ${order.ID} ${action}`) || 'Unbooked',
    },
    {
      headerName: 'orders (changes)',
      field: 'orders',
      flex: 1,
      cellRenderer: ({ data: { orders, prevOrders } }) =>
        orders?.length ? `${orders.length} ( +${orders.length - (prevOrders || 0)} )` : '-',
    },
    { field: 'Duration (From / To)', flex: 1, cellRenderer: ({ data: { from, to } }) => (from ? from + ' / ' + to : '-') },
  ]);

  useEffect(() => {
    getLogs().then((data) => setRowData(Object.values(data).sort((a, b) => b.logged - a.logged)));
  }, []);

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
        />
      </div>
    </>
  );
}
