import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { SessionInformation } from "../../interfaces/sessionInformation.interface";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from "rxjs";
import { PostGet } from "../../features/posts/interfaces/postGet.interface";
import { Topic } from "../../features/topics/interfaces/topic.interface";
import { SubscriptionsApiService } from "../../features/subscription/services/subscriptions-api.service";

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html'
})
export class MeComponent implements OnInit {

  public user: User | undefined;
  public form: FormGroup;
  public topics$: Observable<Topic[]>; // Change to BehaviorSubject
  private topicsSubject: BehaviorSubject<Topic[]> = new BehaviorSubject<Topic[]>([]);

  constructor(private router: Router,
              private sessionService: SessionService,
              private subscriptionsApiService: SubscriptionsApiService,
              private matSnackBar: MatSnackBar,
              private userService: UserService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });

    this.topics$ = this.topicsSubject.asObservable();
  }

  public ngOnInit(): void {
    const sessionUser = this.getCurrentUser();
    if (sessionUser) {
      this.userService.getById(sessionUser.id.toString()).subscribe(user => {
        this.user = user;
        this.form.patchValue(user);
        this.loadTopics();
      });
    }
  }

  private loadTopics(): void {
    this.subscriptionsApiService.findTopicsByUser().subscribe(topics => {
      this.topicsSubject.next(topics);
    });
  }

  public getCurrentUser(): SessionInformation | undefined {
    const sessionUser = this.sessionService.sessionInformation;
    return sessionUser;
  }

  public submit(): void {
    if (this.form.valid) {
      const updatedUser = this.form.value as User;
      this.userService.updateUser(updatedUser).subscribe(() => {
        this.matSnackBar.open('User updated successfully', 'Close', {
          duration: 3000
        });
      }, error => {
        this.matSnackBar.open('Error updating user', 'Close', {
          duration: 3000
        });
      });
    }
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }

  public unsubscribe(topicId: number): void {
    this.subscriptionsApiService.unsubscribeFromTopic(topicId).subscribe(() => {
      this.matSnackBar.open('Unsubscribed successfully', 'Close', {
        duration: 3000
      });
      // Refresh the list of topics after successful unsubscription
      this.loadTopics();
    }, error => {
      this.matSnackBar.open('Error while unsubscribing', 'Close', {
        duration: 3000
      });
    });
  }
}
