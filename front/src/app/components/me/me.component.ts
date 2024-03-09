import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { userUpdate } from "../../interfaces/userUpdate.interface";
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { SessionInformation } from "../../interfaces/sessionInformation.interface";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from "rxjs";
import { Topic } from "../../features/topics/interfaces/topic.interface";
import { SubscriptionsApiService } from "../../features/topics/services/subscriptions-api.service";
import { TopicsApiService } from "../../features/topics/services/topics-api.service";


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html'
})
export class MeComponent implements OnInit {

  public user: User | undefined;
  public form: FormGroup;
  public topics$: Observable<Topic[]>;

  constructor(private router: Router,
              private sessionService: SessionService,
              private topicsApiService: TopicsApiService,
              private matSnackBar: MatSnackBar,
              private userService: UserService,
              private fb: FormBuilder,
              private subscriptionsApiService: SubscriptionsApiService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
    });

    this.topics$ = new Observable<Topic[]>(); // Initialiser topics$ avec un Observable vide
  }

  public ngOnInit(): void {
    const sessionUser = this.getCurrentUser();
    if (sessionUser) {
      this.userService.getById(sessionUser.id.toString()).subscribe(user => {
        this.user = user;
        this.form.patchValue(user);
        this.loadTopics(); // Appeler loadTopics après avoir récupéré l'utilisateur
      });
    }
  }

  private loadTopics(): void {
    this.topicsApiService.getSubscribedTopics().subscribe(topics => {
      this.topics$ = new Observable<Topic[]>(observer => {
        observer.next(topics); // Émettre les topics dans l'Observable
      });
    });
  }

  public getCurrentUser(): SessionInformation | undefined {
    return this.sessionService.sessionInformation;
  }

  public submit(): void {
    if (this.form.valid) {
      const updatedUser = this.form.value as userUpdate;
      console.log(updatedUser);
      this.userService.updateUser(updatedUser).subscribe(response => {
        this.matSnackBar.open("Utilisateur modifié", 'Close', { duration: 3000 });
      });
      this.logout();
    }
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }

  public unsubscribe(topicId: number): void {
    this.subscriptionsApiService.unsubscribeFromTopic(topicId).subscribe(() => {
      this.matSnackBar.open('Désabonnement réussi', 'Fermer', {
        duration: 3000
      });
      // Rafraîchir la liste des sujets après le désabonnement réussi
      this.loadTopics();
    }, error => {
      this.matSnackBar.open('Erreur lors du désabonnement', 'Fermer', {
        duration: 3000
      });
    });
  }
}
