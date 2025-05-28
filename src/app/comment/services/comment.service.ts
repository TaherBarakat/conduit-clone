import { inject, Injectable } from '@angular/core';
import { CommentDataStorageService } from './comment-data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  // constructor() { }
  private _commentDataStr = inject(CommentDataStorageService);

  addComment(slug: string, comment: string) {
    this._commentDataStr.postComment(slug, comment).subscribe();
  }
}
