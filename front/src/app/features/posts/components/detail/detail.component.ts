import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.router.navigate(['/post']);
  }

  private fetchPost(): void {
    const postId = this.route.snapshot.params['id'];
    console.log(postId);
    this.postApiService.getPost(postId).subscribe(
      (post: PostGet) => {
        this.post = post;
      }
    );
  }

  public addComment(postId: number): void {
    const comment = this.commentForm.value;
    this.commentApiService.addCommentToPost(postId, comment).subscribe(
      () => {
        // Mettre à jour les données du post après avoir ajouté un commentaire
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
