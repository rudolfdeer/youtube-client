import * as React from 'react';
import { TextField } from '@mui/material';

type SearchInputProps = {
  handleSubmit: Function;
  value: string;
  setValue: Function;
};

export default function SearchInput(props: SearchInputProps): JSX.Element {
  const { handleSubmit, value, setValue } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className="form"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
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
