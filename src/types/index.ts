
export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  author: User;
  status: 'draft' | 'published' | 'archived';
  upvotes: number;
  views: number;
  saved?: boolean;
  comments: Comment[];
  tags?: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  upvotes: number;
  replies?: Comment[];
}

export interface Stats {
  posts: number;
  upvotes: number;
  views: number;
  saves: number;
}

export type TimeFrame = 'day' | 'week' | 'month' | 'year' | 'all';
export type SortBy = 'views' | 'upvotes';
