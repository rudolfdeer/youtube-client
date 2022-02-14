import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styled from 'styled-components';
import { Video } from '../interfaces';

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoText = styled.div`
  display: block;
  margin: 0;
  margin-left: 15px;
`;

type VideoCardProps = {
  video: Video;
};

export default function VideoCard(props: VideoCardProps): JSX.Element {
  const { video } = props;

  console.log(video);

  return (
    <Card sx={{ width: 250, height: 400 }}>
      <CardHeader title={video.snippet.title} sx={{ height: 100 }} />
      <CardMedia
        component="img"
        height="200"
        image={video.snippet.thumbnails.medium.url}
        alt="Video image preview"
        sx={{ marginBottom: 2 }}
      />
      <InfoContainer>
        <PersonIcon />
        <InfoText>{video.snippet.channelTitle}</InfoText>
      </InfoContainer>
      <InfoContainer>
        <DateRangeIcon />
        <InfoText>{video.snippet.publishedAt}</InfoText>
      </InfoContainer>
      <InfoContainer>
        <VisibilityIcon />
        <InfoText>{}</InfoText>
      </InfoContainer>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {video.snippet.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
