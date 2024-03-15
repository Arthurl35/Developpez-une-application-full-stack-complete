import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {PostApiService} from "../../services/posts-api.service";
import {TopicsApiService} from "../../../topics/services/topics-api.service";
import {Observable} from "rxjs";
import {Topic} from "../../../topics/interfaces/topic.interface";
import {PostCreate} from "../../interfaces/postCreate.interface";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class PostFormComponent {

  public topics$: Observable<Topic[]> = this.topicsApiService.getSubscribedTopics();

  /**
   * Form for creating a new post.
   */
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


  /**
   * Submits the form to create a new post.
   */
  public submit(): void {
    const post = this.postForm.value as unknown as PostCreate;

    this.postApiService
      .addPost(post)
      .subscribe(
        (response: any) : void => {
          this.exitPage();
        },
        (error: any): void => {
          console.error('Error submitting post:', error);
          this.matSnackBar.open("Une erreur s'est produite lors de l'ajout de l'article", 'Fermer', { duration: 3000 });
        }
      );
  }

  /**
   * Exits the page and navigates to the posts page.
   * @private
   */
  private exitPage(): void {
    this.matSnackBar.open("Article ajouté", 'Fermer', { duration: 3000 });
    this.router.navigate(['posts']);
  }
}
