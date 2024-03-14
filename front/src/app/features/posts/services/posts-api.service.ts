import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostGet } from '../interfaces/postGet.interface';
import {PostCreate} from "../interfaces/postCreate.interface";

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  private pathService = 'api/posts';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Fetches all posts.
   * @returns An Observable of an array of posts.
   */
  public getAllPosts(): Observable<PostGet[]> {
    return this.httpClient.get<PostGet[]>(this.pathService);
  }

  /**
   * Fetches a specific post.
   * @param id The ID of the post.
   * @returns An Observable of the post.
   */
  public getPost(id: number): Observable<PostGet> {
    return this.httpClient.get<PostGet>(`${this.pathService}/${id}`);
  }

  /**
   * Sends a request to add a new post.
   * @param post The post to be added.
   * @returns An Observable of the added post.
   */
  public addPost(post: PostCreate): Observable<PostCreate> {
    return this.httpClient.post<PostCreate>(this.pathService, post);
  }
}
