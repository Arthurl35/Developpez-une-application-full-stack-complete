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

  public unsubscribeFromTopic(topicId: number): Observable<Topic> {
    return this.httpClient.post<Topic>(`${this.pathService}/${topicId}/unsubscribe`, {});
  }

  public subscribeCurrentUserToTopic(topicId: number): Observable<Topic> {
    return this.httpClient.post<Topic>(`${this.pathService}/${topicId}/subscribe`, {});
  }
}
