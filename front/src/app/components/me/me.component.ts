import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Topic } from '../../features/topics/interfaces/topic.interface';
import { SubscriptionsApiService } from '../../features/topics/services/subscriptions-api.service';
import { TopicsApiService } from '../../features/topics/services/topics-api.service';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { userUpdate } from '../../interfaces/userUpdate.interface';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html'
})
export class MeComponent implements OnInit, OnDestroy {

  public user: User | undefined;
  public topics$: Observable<Topic[]> | undefined;
  private unsubscribe$ = new Subject<void>();

  /**
   * Form for updating user personal information.
   */
  public form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    username: [
      '',
      [
        Validators.required,
      ]
    ]
  });

  constructor(private router: Router,
              private sessionService: SessionService,
              private topicsApiService: TopicsApiService,
              private matSnackBar: MatSnackBar,
              private userService: UserService,
              private fb: FormBuilder,
              private subscriptionsApiService: SubscriptionsApiService) {
  }

  /**
   * Retrieves the current user and their subscribed topics.
   */
  public ngOnInit(): void {
    const sessionUser = this.getCurrentUser();
    if (sessionUser) {
      this.userService.getById(sessionUser.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((user: User) => {
        this.user = user;
        this.form.patchValue(user);
        this.loadTopics();
      });
    }
  }

  /**
   * Retrieves the topics that the user is subscribed to.
   */
  private loadTopics(): void {
    this.topicsApiService.getSubscribedTopics().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((topics: Topic[]) => {
      this.topics$ = new Observable<Topic[]>((observer) => {
        observer.next(topics);
      });
    });
  }

  /**
   * Retrieves the current session user.
   */
  public getCurrentUser(): SessionInformation | undefined {
    return this.sessionService.sessionInformation;
  }

  /**
   * Called when the user submits the form to update their personal information.
   */
  public submit(): void {
    if (this.form.valid) {
      const updatedUser = this.form.value as userUpdate;

      this.userService.updateUser(updatedUser).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(response => {
        this.matSnackBar.open("Utilisateur modifié", 'Close', { duration: 3000 });
      });
      this.logout();
    }
  }

  /**
   * Logs out the user and redirects them to the home page.
   */
  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }

  /**
   * Allows the user to unsubscribe from a topic.
   */
  public unsubscribe(topicId: number): void {
    this.subscriptionsApiService.unsubscribeFromTopic(topicId).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.matSnackBar.open('Désabonnement réussi', 'Fermer', {
        duration: 3000
      });
      this.loadTopics();
    }, error => {
      this.matSnackBar.open('Erreur lors du désabonnement', 'Fermer', {
        duration: 3000
      });
    });
  }

  /**
   * Unsubscribes from all observables when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
