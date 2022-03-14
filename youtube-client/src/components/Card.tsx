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
  justify-content: start;
  padding-left: 16px;
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

  return (
    <Card sx={{ width: 250, height: 400, margin: '0 auto' }}>
      <CardHeader title={video.snippet.title} sx={{ paddingBottom: 0, marginBottom: '16px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '250px' }} />
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
        <InfoText>{video.snippet.publishedAt.split('T')[0]}</InfoText>
      </InfoContainer>
      <InfoContainer>
        <VisibilityIcon />
        <InfoText>{}</InfoText>
      </InfoContainer>
      <CardContent sx={{ paddingBottom: 0, paddingTop: '8px' }}>
        <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden' }}>
          {video.snippet.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
