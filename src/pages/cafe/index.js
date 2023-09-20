import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper, Button, TextField, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getAllCafes, deleteCafe } from './slices';
import AddNewCafeModal from './components/add_new_cafe_modal';
import AddNewEmployeeModal from '../employees/components/add_new_employee_modal';


const CafePage = () => {

    const cafeState = useSelector(state => state?.cafes?.all ? state?.cafes?.all : []);
    const dispatch = useDispatch();
    const [rawData, setRawData] = useState([]);
    const [key, setKey] = useState('')

    const initCafes = useCallback(() => {

        dispatch(getAllCafes(key))
            .unwrap()
            .then(data => {

            })
            .catch(e => {
                console.log(e);
            });
    }, [dispatch, key])

    useEffect(() => {
        initCafes()
    }, [initCafes])

    useEffect(() => {
        if (Array.isArray(cafeState)) {
            const mappedData = cafeState?.map((el) => {

                return {
                    id: el.id,
                    logo: <div><img src={el.logo} alt="Logo" style={{ width: '50px' }} /></div>,
                    name: el.name,
                    description: el.description,
                    employees: el.employeeCount,
                    location: el.location,
                    edit: <EditButtonRederer data={el} />,
                    delete: <DeleteButtonRederer id={el} />
                };
            });
            setRawData(mappedData);
        } else {
            setRawData([]);
        }
    }, [cafeState]);


    const columnDefs = [
        {
            headerName: 'Logo',
            field: 'logo',
            cellRenderer: (params) => params.data.logo,
            valueFormatter: () => '',
        },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Description', field: 'description' },
        { headerName: 'Employees', field: 'employees', cellRenderer: EmployeesLinkRenderer },
        { headerName: 'Location', field: 'location', filter: true, },
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


    const handleSearchInputChange = (event) => {
        setKey(event.target.value);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Cafes
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <AddNewCafeModal data={{ data: null, action: "add" }} />
                    <TextField
                        label="Search cafes by location"
                        variant="outlined"
                        value={key}
                        size="small"
                        onChange={handleSearchInputChange}
                        style={{ marginTop: '10px', marginBottom: '20px', width: '300px' }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <AddNewEmployeeModal data={{ data: null, action: "add" }} />
                    <Link to="/employees">
                        <Button variant="text">View All Employees</Button>
                    </Link>
                </Grid>
            </Grid>

            <Paper style={{ height: 400, width: '100%' }}>
                <div className="ag-theme-alpine" style={{ height: 350, width: '100%' }}>
                    <AgGridReact
                        rowData={rawData}
                        columnDefs={columnDefs}
                        domLayout="autoHeight"
                        enableFilter={true}
                    />
                </div>
            </Paper>
        </Container>
    );
};

const EditButtonRederer = (params) => (
    <div>
        <AddNewCafeModal data={{ data: params.data, action: 'edit' }} />
    </div>
);

export const DeleteButtonRederer = (params) => {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirmed = () => {
        dispatch(deleteCafe(params.data.id));
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
          Are you sure you want to delete this cafe?
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

const EmployeesLinkRenderer = (params) => {

    return (
        <div>
            <Link to={`/employees/${params.data.id}`}>{params.data.employees}</Link>
        </div>
    )

}

export default CafePage;
