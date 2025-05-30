import { Component, inject, Input } from '@angular/core';
import { IComment } from '../../services/comment-data-storage.service';
import { CommentService } from '../../services/comment.service';
// import { comment } from '../../../article/services/article.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input('comment') comment: IComment;
  @Input() slug: string;

  private _commentSrv = inject(CommentService);

  onRemoveComment() {
    this._commentSrv.removeComment(this.slug, this.comment.id);
  }
}
