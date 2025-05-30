import { Component, Input } from '@angular/core';
import { IComment } from '../../services/comment-data-storage.service';
// import { comment } from '../../../article/services/article.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input('comment') comment: IComment;
}
