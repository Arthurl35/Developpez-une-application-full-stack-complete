import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostGet } from '../interfaces/postGet.interface';
import { Comment } from '../interfaces/comment.interface';
import {ɵElement, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {

  private pathService = 'api/posts';

  constructor(private httpClient: HttpClient) {}

  public addCommentToPost(postId: number, comment: ɵTypedOrUntyped<{
    description: ɵElement<string[], null>
  }, ɵFormGroupValue<{ description: ɵElement<string[], null> }>, any>): Observable<any> {
    return this.httpClient.post(`${this.pathService}/${postId}`, comment, { responseType: 'text' });
  }

}
