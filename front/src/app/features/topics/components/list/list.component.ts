import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TopicsApiService } from "../../services/topics-api.service";
import { Topic } from "../../interfaces/topic.interface";
import { SubscriptionsApiService } from "../../services/subscriptions-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class TopicListComponent implements OnDestroy {

  /**
   * Observable of topics that the user is not subscribed to.
   */
  public topics$: Observable<Topic[]> = this.topicsApiService.getUnsubscribedTopics();

  private unsubscribe$ = new Subject<void>();

  constructor(
    private topicsApiService: TopicsApiService,
    private subscriptionsApiService: SubscriptionsApiService,
    private matSnackBar: MatSnackBar
  ) { }

  /**
   * Subscribes the current user to the given topic.
   * @param topicId The id of the topic to subscribe to.
   */
  subscribe(topicId: number) : void{
    this.subscriptionsApiService.subscribeCurrentUserToTopic(topicId).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (): void => {
        this.matSnackBar.open('Abonnement au sujet réussi', 'Fermer', { duration: 3000 });
        this.refreshTopics();
      },
      (error) : void => {
        this.matSnackBar.open('Erreur lors de l\'abonnement au sujet', 'Fermer', { duration: 3000 });
      }
    );
  }

  /**
   * Refreshes the list of topics.
   */
  private refreshTopics(): void {
    this.topics$ = this.topicsApiService.getUnsubscribedTopics().pipe(
      takeUntil(this.unsubscribe$)
    );
  }

  /**
   * Unsubscribes from all observables when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
