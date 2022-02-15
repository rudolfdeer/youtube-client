import { Grid } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import VideoCard from './Card';
import SearchInput from './Input';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import youtubeApi from '../constants/api';
import { Video } from '../interfaces';

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

  const handleSubmit = async () => {
    if (!value) return;

    const response = await youtubeApi.get('/search', {
      params: {
        type: 'video',
        q: value,
      },
    });
    setVideos(response.data.items);
  };

  const { isLoading, error, data } = useQuery<void, Error>(
    'videos',
    handleSubmit
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>'An error has occurred: {error.message}</div>;

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
            <Grid item xs={3} key={el.id.videoId}>
              <VideoCard video={el} />
            </Grid>
          );
        })}
      </Grid>
    </Main>
  );
}
