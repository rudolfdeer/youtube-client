import { TextField } from '@mui/material';
import React, { useState } from 'react';


export default function SearchInput(): JSX.Element {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    console.log(input.value);
    setValue(input.value);
  }

  return(
    <TextField
      id="outlined-name"
      label="Search"
      value={value}
      onChange={handleChange}
      sx={{width: 280}}
    />
  )
}