import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import { PostApiService } from "../../services/posts-api.service";
import { PostGet } from "../../interfaces/postGet.interface";
import { CommentApiService } from "../../services/comments-api.service";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public post: PostGet | undefined;
  public commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private postApiService: PostApiService,
    private commentApiService: CommentApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.commentForm = this.fb.group({
      description: ['']
    });
  }

  public ngOnInit(): void {
    this.fetchPost();
  }

  public back(): void {
    this.router.navigate(['/previous-route']);
  }

  private fetchPost(): void {
    const postId = this.route.snapshot.params['id']; // Utilisation des crochets pour accéder à la propriété id
    this.postApiService.getPost(postId).subscribe((post: PostGet) => {
      this.post = post;
    });
  }

  public addComment(postId: number): void {
    const comment = this.commentForm.value;
    this.commentApiService.addCommentToPost(postId, comment).subscribe(() => {
      this.fetchPost();
      this.commentForm.reset();
      this.snackBar.open('Comment added successfully', 'Close', { duration: 3000 });
    }, error => {
      this.snackBar.open('Error adding comment', 'Close', { duration: 3000 });
    });
  }

}
