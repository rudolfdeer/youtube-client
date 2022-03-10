import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 16,
    key: 'AIzaSyDeAYkuiFGAakVnoFI3JtEtjqwkYZWTgnM',
  },
});

export default youtubeApi;
