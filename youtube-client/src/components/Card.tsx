import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Link,
} from '@mui/material';
import {
  Person as PersonIcon,
  DateRange as DateRangeIcon,
  Visibility as VisibilityIcon,
  TryRounded,
} from '@mui/icons-material';
import { Video } from '../interfaces';
import { getStatictics } from '../utils/api';
import Chart from './Chart';

type VideoCardProps = {
  video: Video;
};

type InfoContainerProps = {
  snippet: string;
  icon: JSX.Element;
};

function InfoContainerElement({
  snippet,
  icon,
}: InfoContainerProps): JSX.Element {
  return (
    <div className="info__container">
      {icon}
      <div className="info__text">{snippet}</div>
    </div>
  );
}

export default function VideoCard(props: VideoCardProps): JSX.Element {
  const { video } = props;
  const [viewsCount, setViewsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [favoriteCount, setFavCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getStatictics(video.id.videoId);
      const statistics = response.data.items[0].statistics;
      setViewsCount(statistics.viewCount);
      setLikesCount(statistics.likeCount);
      setFavCount(statistics.favoriteCount);
      setCommentsCount(statistics.commentCount);
    };
    fetchData();
  });

  const flipCard = () => {
    setIsFlipped((prevState) => !prevState);
  };

  return (
    <Card
      sx={{ width: 250, height: 400, margin: '0 auto' }}
      className="card"
      onClick={flipCard}
    >
      <Chart
        isVisible={isFlipped}
        likes={likesCount}
        views={viewsCount}
        comments={commentsCount}
        favorites={favoriteCount}
      ></Chart>
      {!isFlipped ? (
        <>
          <Link
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            sx={{ textDecoration: 'none' }}
          >
            <CardHeader
              title={video.snippet.title}
              sx={{
                paddingBottom: 0,
                marginBottom: '16px',
                ' .MuiTypography-root': {
                  width: 218,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
              }}
            />
          </Link>
          <CardMedia
            component="img"
            height="200"
            image={video.snippet.thumbnails.medium.url}
            alt="Video image preview"
            sx={{ marginBottom: 2 }}
          />

          <CardContent sx={{ paddingBottom: 0, paddingTop: '8px' }}>
            <InfoContainerElement
              snippet={video.snippet.channelTitle}
              icon={<PersonIcon />}
            />
            <InfoContainerElement
              snippet={video.snippet.publishedAt.split('T')[0]}
              icon={<DateRangeIcon />}
            />
            <InfoContainerElement
              snippet={`${viewsCount}`}
              icon={<VisibilityIcon />}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ overflow: 'hidden', marginTop: '16px' }}
            >
              {video.snippet.description}
            </Typography>
          </CardContent>
        </>
      ) : null}
    </Card>
  );
}
