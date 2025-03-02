import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const NumericInput = ({ 
  label, 
  value, 
  onChange, 
  startAdornment, 
  endAdornment, 
  allowDecimals = true,
  required = false,
  ...props 
}) => {
  const [inputValue, setInputValue] = useState(value?.toString() || '');
  
  useEffect(() => {
    setInputValue(value?.toString() || '');
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Regex for validating numeric input with or without decimals
    const regex = allowDecimals ? /^$|^[0-9]+\.?[0-9]*$/ : /^$|^[0-9]+$/;
    
    if (regex.test(newValue)) {
      setInputValue(newValue);
      onChange(newValue === '' ? '' : allowDecimals ? parseFloat(newValue) || 0 : parseInt(newValue) || 0);
    }
  };

  return (
    <TextField
      label={label}
      value={inputValue}
      onChange={handleChange}
      required={required}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : null,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : null,
      }}
      autoComplete="off"
      {...props}
    />
  );
};

export default NumericInput;