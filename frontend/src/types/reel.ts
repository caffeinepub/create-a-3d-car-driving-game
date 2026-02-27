export interface Reel {
  id: string;
  title: string;
  description: string;
  author: string;
  authorHandle: string;
  videoUrl: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
}
