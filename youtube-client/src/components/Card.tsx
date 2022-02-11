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

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const InfoText = styled.div`
  display: block;
  margin: 0;
  margin-left: 15px;
`

export default function VideoCard(): JSX.Element {
  return (
    <Card sx={{ maxWidth: 300, height: 400 }}>
      <CardHeader title="Shrimp and Chorizo Paella" />
      <CardMedia
        component="img"
        height="200"
        image="../../assets/oat.png"
        alt="Video image preview"
      />
      <InfoContainer>
        <PersonIcon />
        <InfoText>Author name</InfoText>
      </InfoContainer>
      <InfoContainer>
        <DateRangeIcon />
        <InfoText>Date of publishing</InfoText>
      </InfoContainer>
      <InfoContainer>
        <VisibilityIcon />
        <InfoText>Views</InfoText>
      </InfoContainer>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}
