import axios from 'axios';

const youtubeApiSnippet = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 16,
    key: 'AIzaSyDeAYkuiFGAakVnoFI3JtEtjqwkYZWTgnM',
  },
});

export const searchVideos = (value: string, nextPageToken?: string) => {
  return youtubeApiSnippet.get('/search', {
    params: {
      type: 'video',
      q: value,
      pageToken: nextPageToken ? nextPageToken : null,
    },
  });
};

const youtubeApiStatistics = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'statistics',
    key: 'AIzaSyDeAYkuiFGAakVnoFI3JtEtjqwkYZWTgnM',
  },
});

export const getStatictics = (id: string) => {
  return youtubeApiStatistics.get('/videos', {
    params: {
      id: id,
    },
  });
};
