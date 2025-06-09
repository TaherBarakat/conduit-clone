import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { CommentService } from '../../services/comment.service';
import { FormControl, FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  private _auth = inject(AuthService);
  private _commentSrv = inject(CommentService);
  private _route = inject(ActivatedRoute);

  commentBody = new FormControl('', Validators.required);

  articleSlug!: string;
  userImage = this._auth.user$.value?.image;
  // currentUser = this._auth.user$.value;
  isLoggedIn = this._auth.user$.value?.username && true;
  error: any;

  ngOnInit() {
    this.articleSlug = this._route.snapshot.params['article-slug'];
  }

  onPostComment() {
    this._commentSrv
      .addComment(this.articleSlug, this.commentBody.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.error =
            error.error.errors['body'][0] === `can't be blank`
              ? 'the comment cant be empty'
              : 'an error accrued';
          return throwError(() => error);
        })
      )
      .subscribe((newComment) => {
        this._commentSrv.localComments$.update((prevComments) => [
          newComment,
          ...prevComments,
        ]);
        this.error = undefined;
        this.commentBody.setValue('');
      });
  }
}
