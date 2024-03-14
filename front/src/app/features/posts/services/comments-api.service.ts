import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {

  private pathService = 'api/posts';

  constructor(private httpClient: HttpClient) {}

  public addCommentToPost(postId: number, comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.pathService}/${postId}`, comment);
  }

}
