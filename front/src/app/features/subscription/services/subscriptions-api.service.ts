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

  public subscribeCurrentUserToTopic(id: string): Observable<Topic> {
    return this.httpClient.post<Topic>(`${this.pathService}/${id}/subscribe`, {});
  }
}
