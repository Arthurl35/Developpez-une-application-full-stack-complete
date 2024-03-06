import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {PostApiService} from "../../services/posts-api.service";
import {PostGet} from "../../interfaces/postGet.interface";
import {TopicsApiService} from "../../../topics/services/topics-api.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public postForm: FormGroup | undefined;
  public topics$ = this.topicApiService.getSubscribedTopics();

  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private postApiService: PostApiService,
    private topicApiService: TopicsApiService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
      this.initForm();
  }

  public submit(): void {
    const post = this.postForm?.value as PostGet;

    this.postApiService
      .addPost(post)
      .subscribe((response: any) => {
        this.exitPage(response);
      });
  }

  private initForm(post?: PostGet): void {
    this.postForm = this.fb.group({
      title: [
        post ? post.title : ' ',
        [Validators.required]
      ],
      topicId: [
        post ? post.topicId : ' ',
        [Validators.required]
      ],
      description: [
        post ? post.description : ' ',
        [
          Validators.required,
          Validators.max(2000)
        ]
      ],
    });
  }


  private exitPage(message: string): void {
    this.matSnackBar.open("Article ajouté", 'Fermer', { duration: 3000 });
    this.router.navigate(['posts']);
  }
}
