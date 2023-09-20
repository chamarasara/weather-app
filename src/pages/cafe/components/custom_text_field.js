import React from 'react';
import { TextField } from '@material-ui/core';

const CustomTextField = ({ name, label, value, onChange, error, helperText }) => {
  return (
    <TextField
      name={name}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default CustomTextField;
