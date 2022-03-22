import * as React from 'react';
import { Box, Button, CircularProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import VideoCard from './Card';
import SearchInput from './Input';
import { useQuery } from 'react-query';
import { Video } from '../interfaces';
import ReactPaginate from 'react-paginate';
import { useSwipeable } from 'react-swipeable';
import { searchVideos } from '../utils/api';

const getNumberOfCards = (width: number) => {
  if (width > 1920) {
    return 4;
  } else if (width > 1200) {
    return 3;
  } else if (width > 640) {
    return 2;
  } else {
    return 1;
  }
};

export default function Page(): JSX.Element {
  const [value, setValue] = useState('');
  const [perPage, setPerPage] = useState(4);
  const [currentValue, setCurrentValue] = useState('');
  const [offset, setOffset] = useState(perPage);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const { isLoading, error, data, refetch } = useQuery<Video[], Error>(
    'videos',
    () => handleSubmit(),
    { enabled: false }
  );

  const handleResize = () => {
    const width = window.innerWidth;
    const numberOfCards = getNumberOfCards(width);
    setPerPage(numberOfCards);
  };

  const handleSubmit = async () => {
    if (!value) return;

    const response = await searchVideos(value, nextPageToken);

    refetch();

    if (value !== currentValue) {
      setVideos([...response.data.items]);
    } else {
      setVideos([...videos, ...response.data.items]);
    }

    setCurrentValue(value);

    if (response.data.nextPageToken) {
      setNextPageToken(response.data.nextPageToken);
    }

    return response.data.items;
  };

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    if(selectedPage === pageCount - 1) {
      handleSubmit();
    }
    setCurrentPage(selectedPage);
    setOffset((selectedPage + 1) * perPage);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentPage !== pageCount - 1) {
        handlePageClick({
          selected: currentPage + 1,
        });
      }
    },
    onSwipedRight: () => {
      if (currentPage !== 0) {
        handlePageClick({
          selected: currentPage - 1,
        });
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    setPageCount(Math.ceil(videos.length / perPage));
    setCards(videos.slice(offset - perPage, offset));
  }, [offset, videos, perPage]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          height: '100vh',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <div>'An error has occurred: {error.message}</div>;

  return (
    <main {...handlers} className="main">
      <div className="search">
        <SearchInput
          handleSubmit={handleSubmit}
          value={value}
          setValue={setValue}
        />
        <Button
          sx={{
            color: 'black',
          }}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </div>

      <Grid
        container
        spacing={2}
        style={{ marginBottom: 40, justifyContent: 'center' }}
      >
        {cards?.map((el: Video) => {
          return (
            <Grid
              item
              xs={12}
              sm={3}
              key={el.id.videoId}
              style={{ minWidth: 266 }}
            >
              <VideoCard video={el} />
            </Grid>
          );
        })}
      </Grid>
      {videos.length > 0 ? (
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
      ) : null}

      {videos.length > 0 ? (
        <Button
          sx={{
            color: 'black',
          }}
          onClick={handleSubmit}
        >
          Load more
        </Button>
      ) : null}
    </main>
  );
}
