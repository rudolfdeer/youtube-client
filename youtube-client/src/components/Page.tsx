import { Grid } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import VideoCard from './Card';
import SearchInput from './Input';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import youtubeApi from '../constants/api';
import { Video } from '../interfaces';
import ReactPaginate from 'react-paginate';

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
  const [offset, setOffset] = useState(4);
  const [perPage] = useState(4);
  const [pageCount, setPageCount] = useState(1);
  const [cards, setCards] = useState([]);
  const [videos, setVideos] = useState([]);

  const { isLoading, error, data, refetch } = useQuery<Video[], Error>(
    'videos',
    () => handleSubmit(),
    { enabled: false }
  );

  useEffect(() => {
    setPageCount(Math.ceil(videos.length / perPage));
    setCards(videos.slice(offset - perPage, offset));
  }, [offset, videos]);

  const handleSubmit = async () => {
    if (!value) return;

    const response = await youtubeApi.get('/search', {
      params: {
        type: 'video',
        q: value,
      },
    });

    refetch();
    setVideos(response.data.items);
    return response.data.items;
  };

  const handlePageClick = (e: {
    selected: number;
  }) => {
    const selectedPage = e.selected;
    setOffset((selectedPage + 1) * perPage);
  };

  

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>'An error has occurred: {error.message}</div>;

  return (
    <Main>
      <SearchInput
        handleSubmit={handleSubmit}
        value={value}
        setValue={setValue}
      />
      <Grid container spacing={2} style={{marginBottom: '20px'}}>
        {cards?.map((el: Video) => {
          return (
            <Grid item xs={3} key={el.id.videoId}>
              <VideoCard video={el} />
            </Grid>
          );
        })}
      </Grid>
      <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
    </Main>
  );
}
