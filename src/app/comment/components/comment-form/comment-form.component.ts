import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { CommentService } from '../../services/comment.service';
import { FormControl, FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  private _auth = inject(AuthService);
  private _commentSrv = inject(CommentService);
  private _route = inject(ActivatedRoute);

  articleSlug!: string;
  userImage = this._auth.user$.value?.image;
  // currentUser = this._auth.user$.value;
  commentBody = new FormControl('', Validators.required);
  isLoggedIn = this._auth.user$.value?.username && true;
  ngOnInit() {
    // console.log(this.currentUser, 'ddddddddddddddd');
    this.articleSlug = this._route.snapshot.params['article-slug'];
  }

  onPostComment() {
    this._commentSrv
      .addComment(this.articleSlug, this.commentBody.value)
      .subscribe((newComment) => {
        this._commentSrv.localComments$.update((prevComments) => [
          newComment,
          ...prevComments,
        ]);
        this.commentBody.setValue('');
      });
  }
}
