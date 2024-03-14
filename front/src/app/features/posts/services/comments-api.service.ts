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

  /**
   * Sends a request to add a comment to a post.
   * @param postId The ID of the post.
   * @param comment The comment to be added.
   * @returns An Observable of the added comment.
   */
  public addCommentToPost(postId: number, comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.pathService}/${postId}`, comment);
  }

}
