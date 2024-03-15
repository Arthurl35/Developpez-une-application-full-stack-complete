import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostApiService } from "../../services/posts-api.service";
import { PostGet } from "../../interfaces/postGet.interface";
import { CommentApiService } from "../../services/comments-api.service";
import { Comment } from "../../interfaces/comment.interface";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class PostDetailComponent implements OnInit, OnDestroy {
  public post: PostGet | undefined;
  private unsubscribe$ = new Subject<void>();

  /**
   * Form to add a comment
   */
  public commentForm = this.fb.group({
    description: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private postApiService: PostApiService,
    private commentApiService: CommentApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
    this.postApiService
      .getPost(postId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (post: PostGet) : void => {
          this.post = post;
        }
      );
  }

  /**
   * Adds a comment to the post.
   * @param postId The ID of the post.
   */
  public addComment(postId: number): void {
    const comment = this.commentForm.value as Comment;

    const addComment$ = this.commentApiService.addCommentToPost(postId, comment);

    const fetchPost$ = this.postApiService.getPost(postId);

    /**
     * Adds the comment to the post and fetches the post again to update the view.
     */
    forkJoin([addComment$, fetchPost$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ([_ , post]: [Comment, PostGet]) : void => {
          this.post = post;
          this.commentForm.reset();
          this.snackBar.open('Commentaire ajouté avec succès', 'Fermer', { duration: 3000 });
        },
        (error) : void => {
          this.snackBar.open('Erreur lors de l\'ajout du commentaire', 'Fermer', { duration: 3000 });
        }
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
