import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicsApiService } from "../../services/topics-api.service";
import { Topic } from "../../interfaces/topic.interface";
import { SubscriptionsApiService } from "../../services/subscriptions-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class TopicListComponent {

  /**
   * Observable of topics that the user is not subscribed to.
   */
  public topics$: Observable<Topic[]> = this.topicsApiService.getUnsubscribedTopics();

  constructor(
    private topicsApiService: TopicsApiService,
    private subscriptionsApiService: SubscriptionsApiService,
    private matSnackBar: MatSnackBar
  ) { }

  /**
   * Subscribes the current user to a topic.
   * @param topicId The ID of the topic.
   */
  subscribe(topicId: number) : void{
    this.subscriptionsApiService.subscribeCurrentUserToTopic(topicId).subscribe(
      () => {
        this.matSnackBar.open('Abonnement au sujet réussi', 'Fermer', { duration: 3000 });
        this.refreshTopics();
      },
      (error) => {
        this.matSnackBar.open('Erreur lors de l\'abonnement au sujet', 'Fermer', { duration: 3000 });
      }
    );
  }

  /**
   * Refreshes the list of topics.
   */
  private refreshTopics(): void {
    this.topics$ = this.topicsApiService.getUnsubscribedTopics();
  }
}
