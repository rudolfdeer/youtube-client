import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import VideoCard from './Card';
import SearchInput from './Input';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import youtubeApi from '../constants/api';
import { Video } from '../interfaces';
import ReactPaginate from 'react-paginate';
import { useSwipeable } from "react-swipeable";

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
  const [currentValue, setCurrentValue] = useState('');
  const [offset, setOffset] = useState(4);
  const [perPage] = useState(4);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [prevPageToken, setPrevPageToken] = useState('');
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
        pageToken: nextPageToken ? nextPageToken : null,
      },
    });

    refetch();

    if (value !== currentValue) {
      setVideos([...response.data.items]);
    } else if (value === currentValue) {
      setVideos([...videos, ...response.data.items]);
    }

    setCurrentValue(value);

    if (response.data.nextPageToken) {
      setNextPageToken(response.data.nextPageToken);
    }

    if (response.data.prevPageToken) {
      setPrevPageToken(response.data.prevPageToken);
    }

    return response.data.items;
  };

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
    setOffset((selectedPage + 1) * perPage);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentPage === pageCount - 1) return;
      handlePageClick({
        selected: currentPage + 1,
      });
    },
    onSwipedRight: () => {
      if (currentPage === 0) return;
      handlePageClick({
        selected: currentPage - 1,
      });
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>'An error has occurred: {error.message}</div>;

  return (
    <Main {...handlers}>
      <SearchInput
        handleSubmit={handleSubmit}
        value={value}
        setValue={setValue}
      />
      <Grid container spacing={2} style={{ marginBottom: '40px', justifyContent: 'center' }} >
        {cards?.map((el: Video) => {
          return (
            <Grid item xs={12} sm={3} key={el.id.videoId} style={{ minWidth: '266px'}}>
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
        forcePage={currentPage}
      />
      <Button
        sx={{
          color: 'black',
        }}
        onClick={handleSubmit}>
          Load more
      </Button>
    </Main>
  );
}
