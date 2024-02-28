import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostGet } from '../interfaces/postGet.interface';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  private pathService = 'api/posts';

  constructor(private httpClient: HttpClient) {
  }

  public getAllPosts(): Observable<PostGet[]> {
    return this.httpClient.get<PostGet[]>(this.pathService);
  }

  public getPost(id: string): Observable<PostGet> {
    return this.httpClient.get<PostGet>(`${this.pathService}/${id}`);
  }

  public addPost(post: PostGet): Observable<PostGet> {
    return this.httpClient.post<any>(this.pathService, post, { responseType: 'text' as 'json' });
  }
}
