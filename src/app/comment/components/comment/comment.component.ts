import { Component, inject, Input, OnInit } from '@angular/core';
import { IComment } from '../../services/comment-data-storage.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../../auth/auth.service';
// import { comment } from '../../../article/services/article.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  @Input('comment') comment: IComment;
  @Input() slug: string;
  private _auth = inject(AuthService);
  isMyComment!: boolean;
  private _commentSrv = inject(CommentService);

  ngOnInit(): void {
    this.isMyComment =
      this._auth.user$.value.username === this.comment.author.username;
  }
  onRemoveComment() {
    this._commentSrv.removeComment(this.slug, this.comment.id);
  }
}
