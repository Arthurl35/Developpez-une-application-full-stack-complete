import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PostApiService } from "../../services/posts-api.service";
import { PostGet } from "../../interfaces/postGet.interface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class PostListComponent implements OnDestroy {

  public posts$: Observable<PostGet[]>;
  public isDescendingOrder: boolean = false;
  private unsubscribe$ = new Subject<void>();

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
      takeUntil(this.unsubscribe$),
      map((posts: PostGet[]) =>
        posts.sort((a: PostGet, b: PostGet): number => {
          if (this.isDescendingOrder) {
            return a.createdAt < b.createdAt ? 1 : -1; // Tri desc
          } else {
            return a.createdAt > b.createdAt ? 1 : -1; // Tri asc
          }
        })
      )
    );
  }

  /**
   * Unsubscribes from the Subject when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
