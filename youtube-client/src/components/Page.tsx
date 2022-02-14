import { Grid } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import VideoCard from './Card';
import SearchInput from './Input';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import youtubeApi from '../constants/api';

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Page(): JSX.Element {
  const [value, setValue] = useState('');
  const [videos, setVideos] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await youtubeApi.get('/search', {
      params: {
        type: 'video',
        q: value,
      },
    });
    setVideos(response.data.items);
  };

  return (
    <Main>
      <SearchInput
        handleSubmit={handleSubmit}
        value={value}
        setValue={setValue}
      />
      <Grid container spacing={2}>
        {videos.map((el) => {
          return (
            <Grid item xs={3}>
              <VideoCard video={el} key={el.id.videoId} />
            </Grid>
          );
        })}
      </Grid>
    </Main>
  );
}
