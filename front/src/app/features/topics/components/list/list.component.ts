import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import {TopicsApiService} from "../../services/topics-api.service";
import {Topic} from "../../interfaces/topic.interface";
import {SubscriptionsApiService} from "../../../subscription/services/subscriptions-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public topics$: Observable<Topic[]> = this.topicsApiService.findAll();

  constructor(
    private sessionService: SessionService,
    private topicsApiService: TopicsApiService,
    private subscriptionsApiService: SubscriptionsApiService,
    private matSnackBar: MatSnackBar
  ) { }

  get user(): SessionInformation | undefined {
    return this.sessionService.sessionInformation;
  }

  subscribe(topicId: number) {
    this.subscriptionsApiService.subscribeCurrentUserToTopic(topicId.toString()).subscribe();
  }
}
