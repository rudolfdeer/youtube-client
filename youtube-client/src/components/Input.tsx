import { TextField } from '@mui/material';
import React, { FormEventHandler, useState } from 'react';

type SearchInputProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  value: string;
  setValue: Function;
};

export default function SearchInput(props: SearchInputProps): JSX.Element {
  const { handleSubmit, value, setValue } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="outlined-name"
        label="Search"
        value={value}
        onChange={handleChange}
        sx={{ width: 280 }}
      />
    </form>
  );
}
