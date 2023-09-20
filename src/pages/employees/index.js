// src/components/EmployeesPage.js
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getAllEmployees } from './slices';
import { useParams } from 'react-router-dom';
import { getCafeById } from '../cafe/slices';
import AddNewEmployeeModal from './components/add_new_employee_modal';

const EmployeesPage = () => {
  const { id } = useParams()
  const cafeState = useSelector(state=> state.cafes?.selected)
  const employeeState = useSelector(state => state.employees?.all);
  const cafeName = cafeState?.name ? cafeState?.name : ""
  const [rawData, setRawData] = useState([]);
  const dispatch = useDispatch()

  const initCafe = useCallback(() => {

    dispatch(getCafeById(id))
      .unwrap()
      .then(data => {

      })
      .catch(e => {
        console.log(e);
      });
  }, [dispatch, id])

  useEffect(() => {
    initCafe()
  }, [initCafe])

  const initEmployees = useCallback(() => {

    dispatch(getAllEmployees(cafeName))
      .unwrap()
      .then(data => {

      })
      .catch(e => {
        console.log(e);
      });
  }, [dispatch, cafeName])

  useEffect(() => {
    initEmployees()
  }, [initEmployees])

  useEffect(() => {
    if (Array.isArray(employeeState)) {
        const mappedData = employeeState?.map((el) => {
         
            return {
                id: el.id,
                name: el.name,
                email_address: el.email_address,
                phone_number: el.phone_number,
                gender: el.gender,
                cafe: el.cafe_name,
                days_work: el.days_worked,
                edit: <EditButtonRederer data={el} />,
                delete: <DeleteButtonRederer id={el} />
            };
        });
        setRawData(mappedData);
    } else {
        setRawData([]);
    }
}, [employeeState]);

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email_address' },
    { headerName: 'Phone', field: 'phone_number' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Cafe', field: 'cafe' },
    { headerName: 'Days work', field: 'days_work' },
    {
      headerName: 'Edit',
      field: 'edit',
      cellRenderer: EditButtonRederer,
      width: 100,
      suppressSizeToFit: true,
      valueFormatter: () => '',
  },
  {
      headerName: 'Delete',
      field: 'delete',
      cellRenderer: DeleteButtonRederer,
      width: 100,
      suppressSizeToFit: true,
      valueFormatter: () => '',
  },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
       Employees {cafeState?.name}
      </Typography>
      <AddNewEmployeeModal data={{ data: null, action: "add" }}/>
      <Paper style={{ height: 400, width: '100%' }}>
        <div className="ag-theme-alpine" style={{ height: 350, width: '100%' }}>
          <AgGridReact
            rowData={rawData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
          />
        </div>
      </Paper>
    </Container>
  );
};


const EditButtonRederer = (params) => (
  <div>
      <AddNewEmployeeModal data={{ data: params.data, action: 'edit' }} />
  </div>
);

export const DeleteButtonRederer = (params) => {

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteEmployee(params.data.id));
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancelled = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={handleDeleteClick}
      >
        Delete
      </Button>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancelled}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this employee?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancelled} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeesPage;
