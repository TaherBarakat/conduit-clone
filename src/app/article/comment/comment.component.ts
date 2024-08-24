import { Component, Input } from '@angular/core';
import { comment } from '../../shared/articles.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input('comment') comment: comment;
}
