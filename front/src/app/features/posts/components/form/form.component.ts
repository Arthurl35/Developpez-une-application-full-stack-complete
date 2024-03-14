import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {PostApiService} from "../../services/posts-api.service";
import {TopicsApiService} from "../../../topics/services/topics-api.service";
import {Observable} from "rxjs";
import {Topic} from "../../../topics/interfaces/topic.interface";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class PostFormComponent {

  public topics$: Observable<Topic[]> = this.topicsApiService.getSubscribedTopics();

  public postForm = this.fb.group({
    title: [
      '',
      [
        Validators.required,
      ]
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.max(3000)
      ]
    ],
    topicId: [
      '',
      [
        Validators.required,
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private postApiService: PostApiService,
    private topicsApiService: TopicsApiService,
    private router: Router
  ) {
  }

  public submit(): void {
    const post = this.postForm.value;

    this.postApiService
      .addPost(post)
      .subscribe((response: any) => {
        this.exitPage(response);
      });
  }

  private exitPage(message: string): void {
    this.matSnackBar.open("Article ajouté", 'Fermer', { duration: 3000 });
    this.router.navigate(['posts']);
  }
}
