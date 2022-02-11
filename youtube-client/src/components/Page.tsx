import { Grid } from '@mui/material';
import * as React from 'react';
import VideoCard from './Card';
import SearchInput from './Input';
import styled from 'styled-components';

const Main = styled.main`
max-width: 1200px;
margin: 0 auto;
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
`;

export default function Page(): JSX.Element {
  return (
    <Main>
      <SearchInput/>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <VideoCard/>
        </Grid>
      </Grid>
    </Main>
  )
}