import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { createCafe, updateCafe } from '../slices';
import CustomTextField from './custom_text_field';

const AddNewCafeModal = (props) => {

    const { data, action } = props.data;
    let cafeId = data?.id;
    const dispatch = useDispatch();
    const [isAddCafeModalOpen, setAddCafeModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [nameError, setNameError] = useState('');
    const [logoError, seLogoError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        logo: ''
    });

    const openAddCafeModal = () => {
        setAddCafeModalOpen(true);
    };

    const closeAddCafeModal = () => {
        setAddCafeModalOpen(false);
    };

    const onLogoChange = (e) => {
        const file = e.target.files[0];
       // Check if a file is selected
    if (file) {
        // Check the file size
        if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
            // File size exceeds 2MB, display an error message
            setLogoFile(null); // Clear the selected file
            seLogoError("Max file size is 2MB");
        } else {
            // File size is within the limit, clear any previous error message
            seLogoError('');
            setLogoFile(file);
        }
    }
    };

    const dataLoad = useCallback(() => {
        let value = null;

        if (data && action === 'edit') {
            value = {
                name: data?.name,
                description: data?.description,
                location: data?.location,
            };
            setFormData(value);
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
        if (name === 'description') {
            if (value.length > 256) {
                setDescriptionError("Description must be less than 256 characters");
            } else {
                setDescriptionError('');
            }
        }

    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formDataPayload = new FormData();

        if (logoFile) {
            formDataPayload.append('logo', logoFile);
        }

        if (formData.name.length < 6 || formData.name.length > 10) {
            setNameError("Name must be between 6 and 10 characters")
            return;
        } else {
            setNameError('')
        }
        if (formData.description.length > 256) {
            setDescriptionError("Description must be less than 256 characters");

        } else {
            setDescriptionError('');
        }

        const payload = {
            name: formData.name,
            description: formData.description,
            location: formData.location,
        };

        formDataPayload.append('data', JSON.stringify(payload));

        dispatch(
            action === 'add' ? createCafe(formDataPayload) : updateCafe({ id: cafeId, data: formDataPayload })
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
                        Add New Cafe
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
                <DialogTitle>Add New Cafe</DialogTitle>
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
                            error={formData.name.length < 6 || formData.name.length > 10}
                            helperText={nameError}
                        />
                        <CustomTextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.description}
                            onChange={handleInputChange}
                            error={descriptionError !== ''}
                            helperText={descriptionError}
                        />
                        <CustomTextField
                            name="location"
                            label="Location"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            id="logo-upload"
                            style={{ display: 'none' }}
                            onChange={onLogoChange}
                            helperText={logoError}
                        />
                        <label htmlFor="logo-upload">
                            <Button variant="contained" color="default" component="span">
                                Upload Logo
                            </Button>
                        </label>
                        <div style={{ color: 'red' }}>{logoError}</div>
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

export default AddNewCafeModal;
