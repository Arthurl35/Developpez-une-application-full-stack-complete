import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PostApiService } from "../../services/posts-api.service";
import { PostGet } from "../../interfaces/postGet.interface";
import { CommentApiService } from "../../services/comments-api.service";
import { Comment } from "../../interfaces/comment.interface";
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class PostDetailComponent implements OnInit {
  public post: PostGet | undefined;

  /**
   * Form to add a comment
   */
  public commentForm = this.fb.group({
    description: [
      '',
    ]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private postApiService: PostApiService,
    private commentApiService: CommentApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  /**
   * Fetches the post on initialization.
   */
  public ngOnInit(): void {
    this.fetchPost();
  }

  public back(): void {
    this.router.navigate(['/posts']);
  }

  /**
   * Fetches the post from the API.
   */
  private fetchPost(): void {
    const postId = this.route.snapshot.params['id'];
    this.postApiService.getPost(postId).subscribe(
      (post: PostGet) => {
        this.post = post;
      }
    );
  }

  /**
   * Adds a comment to the post.
   * @param postId The ID of the post.
   */
  public addComment(postId: number): void {
    const comment = this.commentForm.value as Comment ;
    this.commentApiService.addCommentToPost(postId, comment).subscribe(
      () => {
        this.fetchPost();
        this.commentForm.reset();
        this.snackBar.open('Commentaire ajouté avec succès', 'Fermer', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Erreur lors de l\'ajout du commentaire', 'Fermer', { duration: 3000 });
      }
    );
  }

}
