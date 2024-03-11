import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import { TopicsApiService } from "../../services/topics-api.service";
import { Topic } from "../../interfaces/topic.interface";
import { SubscriptionsApiService } from "../../services/subscriptions-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class TopicListComponent {

  public topics$: Observable<Topic[]> = this.topicsApiService.getUnsubscribedTopics();

  constructor(
    private topicsApiService: TopicsApiService,
    private subscriptionsApiService: SubscriptionsApiService,
    private matSnackBar: MatSnackBar
  ) { }

  subscribe(topicId: number) {
    this.subscriptionsApiService.subscribeCurrentUserToTopic(topicId.toString()).subscribe(
      () => {
        this.matSnackBar.open('Abonnement au sujet réussi', 'Fermer', { duration: 3000 });
        this.refreshTopics();
      },
      (error) => {
        this.matSnackBar.open('Erreur lors de l\'abonnement au sujet', 'Fermer', { duration: 3000 });
      }
    );
  }

  private refreshTopics(): void {
    this.topics$ = this.topicsApiService.getUnsubscribedTopics();
  }
}
