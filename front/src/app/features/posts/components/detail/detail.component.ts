import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import {PostApiService} from "../../services/posts-api.service";
import {PostGet} from "../../interfaces/postGet.interface";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public post: PostGet | undefined;

  public postId: string;
  public userId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private postApiService: PostApiService,
    private router: Router) {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.userId = this.sessionService.sessionInformation!.id.toString();
  }

  public ngOnInit(): void {
    this.fetchSession();
  }

  public back() {
    window.history.back();
  }

   private fetchSession(): void {
    this.postApiService
      .getPost(this.postId)
      .subscribe((post: PostGet) => {
        this.post = post;
      });
  }

}
