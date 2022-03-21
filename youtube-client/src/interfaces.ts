interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Snippet {
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: string;
  publishedAt: string;

  thumbnails: {
    default: Thumbnail;
    high: Thumbnail;
    medium: Thumbnail;
  };
}

export interface Video {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };

  snippet: Snippet;
}
