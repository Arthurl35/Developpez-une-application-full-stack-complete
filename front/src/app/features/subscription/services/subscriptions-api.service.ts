import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Topic} from "../../topics/interfaces/topic.interface";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsApiService {

  private pathService = 'api/subscriptions';

  constructor(private httpClient: HttpClient) {
  }

  public findTopicsByUser(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.pathService}/subscribed`);
  }

  public unsubscribeFromTopic(topicId: number): Observable<Topic> {
    return this.httpClient.post<Topic>(`${this.pathService}/${topicId}/unsubscribe`, {});
  }

  public subscribeCurrentUserToTopic(topicId: string): Observable<any> {
    return this.httpClient.post(`${this.pathService}/${topicId}/subscribe`, {});
  }
}
