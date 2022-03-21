import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Video } from '../interfaces';

type VideoCardProps = {
  video: Video;
};

type InfoContainerProps = {
  snippet: string,
  icon:  JSX.Element,
}

function InfoContainerElement({snippet, icon}: InfoContainerProps): JSX.Element {
  return (
    <div className="info__container">
        {icon}
        <div className="info__text">{snippet}</div>
    </div>
  )
}

export default function VideoCard(props: VideoCardProps): JSX.Element {
  const { video } = props;

  return (
    <Card sx={{ width: 250, height: 400, margin: '0 auto' }}>
      <CardHeader title={video.snippet.title} sx={{ paddingBottom: 0, marginBottom: '16px', ' .MuiTypography-root': {
      width: 218, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
    }, }} />
      <CardMedia
        component="img"
        height="200"
        image={video.snippet.thumbnails.medium.url}
        alt="Video image preview"
        sx={{ marginBottom: 2 }}
      />
    
      <CardContent sx={{ paddingBottom: 0, paddingTop: '8px' }}>
        <InfoContainerElement snippet={video.snippet.channelTitle} icon={<PersonIcon />}/>
        <InfoContainerElement snippet={video.snippet.publishedAt.split('T')[0]} icon={<DateRangeIcon />}/>
        <InfoContainerElement snippet={'views'} icon={<VisibilityIcon />}/>
        <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', marginTop: '16px' }}>
          {video.snippet.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
