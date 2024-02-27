//import { CommentDto } from './comment.interface';

export interface PostGet {
  id: number;
  title: string;
  description: string;
  topicId: number;
  createdAt: string;
  authorEmail: string;
  topicTitle: string;
  //comments: Comment[];
}
