import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel, Select, MenuItem, InputLabel } from '@material-ui/core';
import { createEmployee, updateEmployee } from '../slices';
import { useParams } from 'react-router-dom';
import { getAllCafes } from '../../cafe/slices';
import CustomTextField from './custom_text_field';

const AddNewEmployeeModal = (props) => {

    const { data, action } = props.data;
    let { id } = useParams();
    const dispatch = useDispatch();
    const cafeState = useSelector(state => state.cafes?.all ? state.cafes?.all : []);
    const [isAddCafeModalOpen, setAddCafeModalOpen] = useState(false);
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const phoneRegex = /^[89]\d{7}$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const [formData, setFormData] = useState({
        name: '',
        email_address: '',
        phone_number: '',
        gender: '',
        cafe_id: id,
    });

    const openAddCafeModal = () => {
        setAddCafeModalOpen(true);
    };

    const closeAddCafeModal = () => {
        setAddCafeModalOpen(false);
    };

    const initCafes = useCallback(() => {

        dispatch(getAllCafes(""))
            .unwrap()
            .then(data => {

            })
            .catch(e => {
                console.log(e);
            });
    }, [dispatch])

    useEffect(() => {
        initCafes()
    }, [initCafes])

    const dataLoad = useCallback(() => {
        if (data && action === 'edit') {
            setFormData({
                name: data.name,
                email_address: data.email_address,
                phone_number: data.phone_number,
                gender: data.gender,
                cafe_id: data.cafe_id,
            });
        }
    }, [data, action]);

    useEffect(() => {
        dataLoad();
    }, [dataLoad]);

    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'name') {
            if (value.length < 6 || value.length > 10) {
                setNameError("Name must be between 6 and 10 characters")
            } else {
                setNameError('')
            }
        }

        if (name === 'phone_number') {
            if (!phoneRegex.test(value)) {
                setPhoneError('Phone number must start with 8 or 9 and have 8 digits');
            } else {
                setPhoneError('');
            }
        }

        if (name === 'email_address') {
            if (!emailRegex.test(value)) {
                setEmailError('Invalid email address');
            } else {
                setEmailError('');
            }
        }
    };


    const onSubmit = (event) => {
        event.preventDefault();

        if (formData.name.length < 6 || formData.name.length > 10) {
            setNameError("Name must be between 6 and 10 characters")
            return;
        } else {
            setNameError('')
        }

        if (formData.phone_number && !phoneRegex.test(formData.phone_number)) {
            setPhoneError('Phone number must start with 8 or 9 and have 8 digits');
            return;
        } else {
            setPhoneError('');
        }

        if (formData.email_address && !emailRegex.test(formData.email_address)) {
            setEmailError('Invalid email address');
            return;
        } else {
            setEmailError('');
        }

        const payload = {
            name: formData.name,
            email_address: formData.email_address,
            phone_number: formData.phone_number,
            gender: formData.gender,
            cafe_id: formData.cafe_id?formData.cafe_id:"",
        };

        dispatch(
            action === 'add'
                ? createEmployee({ data: payload })
                : updateEmployee({ id: data.id, data: payload })
        )
            .unwrap()
            .then((res) => {
                closeAddCafeModal();
            })
            .catch((e) => {
                console.log(e);
            });
    };


    return (
        <>
            {action === 'add' && (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={openAddCafeModal}
                        style={{ marginBottom: '16px' }}
                    >
                        Add New Employee
                    </Button>
                </div>
            )}

            {action === 'edit' && (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={openAddCafeModal}
                    style={{ marginBottom: '16px' }}
                >
                    Edit
                </Button>
            )}

            <Dialog open={isAddCafeModalOpen} onClose={closeAddCafeModal} fullWidth maxWidth="sm">
                <DialogTitle>{action === 'add' ? 'Add New Employee' : 'Edit Employee'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <CustomTextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.name}
                            onChange={handleInputChange}
                            inputProps={{
                                minLength: 6,
                                maxLength: 10,
                            }}
                            error={formData.name.length < 6 || formData.name.length > 10}
                            helperText={nameError}
                        />
                        <CustomTextField
                            name="email_address"
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.email_address}
                            onChange={handleInputChange}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <CustomTextField
                            name="phone_number"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            error={!!phoneError}
                            helperText={phoneError}
                        />
                        <InputLabel htmlFor="cafe_id">Select Cafe</InputLabel>
                        <Select
                            name="cafe_id"
                            id="cafe_id"
                            value={formData.cafe_id}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        >
                            <MenuItem value="">
                                <em>Select a Cafe</em>
                            </MenuItem>
                            {
                                Array.isArray(cafeState) && cafeState?.map((el, index) => {
                                    return (
                                        <MenuItem key={index} value={el?.id}>{el?.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <RadioGroup name="gender" row value={formData.gender} onChange={handleInputChange}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        <DialogActions>
                            <Button onClick={closeAddCafeModal} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                {action === 'add' ? 'Add' : 'Save'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddNewEmployeeModal;
