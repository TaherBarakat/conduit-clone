import { inject, Injectable, signal, Signal } from '@angular/core';
import {
  CommentDataStorageService,
  IComment,
} from './comment-data-storage.service';
import { IArticle } from '../../article/models/article.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _commentDataStr = inject(CommentDataStorageService);

  localComments$ = signal<IComment[]>([]);

  setLocalComments(slug: string) {
    this._commentDataStr.loadComments(slug).subscribe((loadedArticles) => {
      // console.log(loadedArticles, 'fromcommentreq');

      this.localComments$.set(loadedArticles);
    });
  }
  addComment(slug: string, comment: string): Observable<IComment> {
    return this._commentDataStr.postComment(slug, comment);
  }
}
