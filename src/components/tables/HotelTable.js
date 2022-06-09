import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { getHotelNumbers } from '../../requests/firebase';
import OrdersTable from './OrdersTable';

const useStyles = makeStyles({
  tableWrap: { display: 'flex', justifyContent: 'space-between' },
  sizes: { width: '95vw', height: 500, border: '1px solid rgba(1, 1, 1, 0.1)' },
  buttonWrap: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  '@media (max-width: 1250px)': {
    tableWrap: { flexDirection: 'column' },
    wrap: { display: 'flex', flexDirection: 'column-reverse' },
  },
});

export default function HotelTable() {
  const classes = useStyles();
  const [rowData, setRowData] = useState();
  const [orders, setOrders] = useState();
  const defaultColDef = { sortingOrder: ['desc', 'asc'], resizable: true, sortable: true };
  const [columnDefs] = useState([
    { field: 'room', pinned: 'left', width: 80 },
    {
      headerName: 'Status',
      field: 'booked',
      flex: 1,
      editable: true,
      cellRenderer: ({ data: { booked } }) => {
        return booked || 'free';
      },
    },
    {
      field: 'orders',
      flex: 1,
      cellRenderer: ({ data: { orders, room } }) => {
        return orders ? (
          <Button size='small' onClick={() => setOrders(room)}>
            {'orders: ' + orders.length}
          </Button>
        ) : (
          '-'
        );
      },
    },
    {
      field: 'from',
      flex: 1,
      cellRenderer: ({ data: { from } }) => {
        return from ? new Date(from).toLocaleDateString() : '-';
      },
    },
    {
      field: 'to',
      flex: 1,
      cellRenderer: ({ data: { to } }) => {
        return to ? new Date(to).toLocaleDateString() : '-';
      },
    },
    {
      field: 'bookingDate',
      flex: 1,
      cellRenderer: ({ data: { bookingDate } }) => {
        return bookingDate ? new Date(bookingDate).toLocaleDateString() : '-';
      },
    },
  ]);

  useEffect(() => {
    getHotelNumbers().then((data) => {
      setRowData(Object.values(data).flat());
    });
  }, []);

  const getRowStyle = ({ data: { booked, room } }) => {
    return {
      backgroundColor: booked ? 'rgba(240,128,128, 0.3)' : 'rgba(144,238,144, 0.3)',
      borderBottom: room % 10 === 6 && room !== 106 ? '3px solid rgba(1, 1, 1, 0.2)' : '',
    };
  };

  return (
    <div className={classes.tableWrap}>
      <div className={classes.sizes + ' ag-theme-material'}>
        <AgGridReact
          animateRows='true'
          suppressRowClickSelection='true'
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowStyle={getRowStyle}
        />
      </div>
      {orders && (
        <div className={classes.wrap}>
          <OrdersTable roomNumber={orders} />
          <div className={classes.buttonWrap}>
            <Typography variant='button' align='center'>
              Room: {orders}
            </Typography>
            <Button onClick={() => setOrders(null)} color='secondary' size='small'>
              close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
