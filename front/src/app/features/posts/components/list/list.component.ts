import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PostApiService } from "../../services/posts-api.service";
import { PostGet } from "../../interfaces/postGet.interface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PostListComponent {

  public posts$: Observable<PostGet[]>;
  public isDescendingOrder: boolean = false;

  constructor(
    private postApiService: PostApiService
  ) {
    this.posts$ = this.postApiService.getAllPosts();
  }

  public sort(): void {
    this.isDescendingOrder = !this.isDescendingOrder; // Inverse l'ordre à chaque clic
    this.posts$ = this.posts$.pipe(
      map((posts) =>
        posts.sort((a, b) => {
          if (this.isDescendingOrder) {
            return a.createdAt < b.createdAt ? 1 : -1; // Tri descendant
          } else {
            return a.createdAt > b.createdAt ? 1 : -1; // Tri ascendant
          }
        })
      )
    );
  }
}
