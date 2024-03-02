import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostGet } from '../interfaces/postGet.interface';
import { Comment } from '../interfaces/comment.interface';
@Injectable({
  providedIn: 'root'
})
export class CommentApiService {

  private pathService = 'api/posts';

  constructor(private httpClient: HttpClient) {
  }

  public addCommentToPost(postId: number, comment: Comment): Observable<PostGet> {
    return this.httpClient.post<any>(`${this.pathService}/${postId}/comments`, comment);
  }
}
