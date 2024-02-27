import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import {PostApiService} from "../../services/posts-api.service";
import {PostGet} from "../../interfaces/postGet.interface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public posts$: Observable<PostGet[]> = this.postApiService.getAllPosts();

  constructor(
    private sessionService: SessionService,
    private postApiService: PostApiService
  ) { }

  get user(): SessionInformation | undefined {
    return this.sessionService.sessionInformation;
  }
}
