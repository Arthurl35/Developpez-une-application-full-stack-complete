import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Topic} from "../interfaces/topic.interface";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsApiService {

  private pathService = 'api/subscriptions';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Unsubscribes the current user from a topic.
   * @param topicId The ID of the topic.
   * @returns An Observable of the topic.
   */
  public unsubscribeFromTopic(topicId: number): Observable<Topic> {
    return this.httpClient.post<Topic>(`${this.pathService}/${topicId}/unsubscribe`, {});
  }

  /**
   * Subscribes the current user to a topic.
   * @param topicId The ID of the topic.
   * @returns An Observable of the topic.
   */
  public subscribeCurrentUserToTopic(topicId: number): Observable<Topic> {
    return this.httpClient.post<Topic>(`${this.pathService}/${topicId}/subscribe`, {});
  }
}
