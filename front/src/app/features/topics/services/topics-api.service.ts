import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicsApiService {

  private pathService = 'api/topics';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Fetches topics that the current user is not subscribed to.
   * @returns An Observable of an array of topics.
   */
  public getUnsubscribedTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.pathService}/unsubscribed`);
  }

  /**
   * Fetches topics that the current user is subscribed to.
   * @returns An Observable of an array of topics.
   */
  public getSubscribedTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.pathService}/subscribed`);
  }
}
