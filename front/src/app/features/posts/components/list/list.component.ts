import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PostApiService } from "../../services/posts-api.service";
import { PostGet } from "../../interfaces/postGet.interface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class PostListComponent {

  public posts$: Observable<PostGet[]>;
  public isDescendingOrder: boolean = false;

  constructor(
    private postApiService: PostApiService
  ) {
    this.posts$ = this.postApiService.getAllPosts();
  }

  /**
   * Sorts the posts by date. Descending or ascending.
   */
  public sort(): void {
    this.isDescendingOrder = !this.isDescendingOrder;

    this.posts$ = this.posts$.pipe(
      map((posts : PostGet[]) =>
        posts.sort((a :PostGet, b : PostGet) : number => {
          if (this.isDescendingOrder) {
            return a.createdAt < b.createdAt ? 1 : -1; // Tri desc
          } else {
            return a.createdAt > b.createdAt ? 1 : -1; // Tri asc
          }
        })
      )
    );
  }
}
