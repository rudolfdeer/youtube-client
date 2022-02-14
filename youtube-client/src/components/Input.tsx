import { TextField } from '@mui/material';
import React, { FormEventHandler, useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin-bottom: 50px;
`;

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
    <Form onSubmit={handleSubmit}>
      <TextField
        id="outlined-name"
        label="Search"
        value={value}
        onChange={handleChange}
        sx={{ width: 280 }}
      />
    </Form>
  );
}
