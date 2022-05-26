import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { getOrders, roomOrdersRef, setOrderState } from '../requests/firebase';
import { onValue } from 'firebase/database';

const useStyles = makeStyles({
  size: { width: 500, height: 500, border: '1px solid rgba(1, 1, 1, 0.1)' },
});

export default function OrdersTable(props) {
  const classes = useStyles();
  const { roomNumber } = props;
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    {
      headerName: 'Order Name',
      field: 'str',
      width: 180,
    },
    {
      field: 'actions',
      width: 180,
      cellRenderer: ({ data: order }) => {
        if (!order.completed && !order.canceled) {
          return (
            <>
              <Button
                onClick={() => {
                  setOrderState(roomNumber, order, 'canceled');
                }}
                size='small'
                color='secondary'>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setOrderState(roomNumber, order, 'completed');
                }}
                size='small'
                color='primary'>
                Confirm
              </Button>
            </>
          );
        }
      },
    },
    {
      field: 'status',
      cellRenderer: ({ data }) => (data.completed ? 'completed' : data.canceled ? 'canceled' : 'waiting'),
      width: 120,
      cellStyle: ({ data }) => ({ color: data.canceled ? 'red' : data.completed ? 'green' : 'orange', textTransform: 'uppercase' }),
    },
  ]);

  const defaultColDef = { resizable: true, sortable: true };
  useEffect(() => {
    getOrders(roomNumber).then((data) => {
      setRowData(data.map((e, ID) => ({ ...e, ID })));
    });
    onValue(roomOrdersRef(roomNumber), (snapshot) => {
      const data = snapshot.val().map((e, ID) => ({ ...e, ID }));
      if (JSON.stringify(data) !== JSON.stringify(rowData)) {
        setRowData(data);
      }
    });
  }, [roomNumber]);

  return (
    <div className={`${classes.size} ag-theme-material`}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
    </div>
  );
}
