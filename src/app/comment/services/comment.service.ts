import { inject, Injectable, signal, Signal } from '@angular/core';
import {
  CommentDataStorageService,
  IComment,
} from './comment-data-storage.service';
import { IArticle } from '../../article/models/article.model';
import { Observable } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _commentDataStr = inject(CommentDataStorageService);
  private _modalSrv = inject(ModalService);

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

  removeComment(slug: string, commentId: number): void {
    this._modalSrv.showConformMessage(
      'you sure you want to delete this comment?'
    );

    this._modalSrv.setFunctionality(() => {
      this._commentDataStr.deleteComment(slug, commentId).subscribe(() => {
        this.localComments$.update((comments) =>
          comments.filter((c) => c.id !== commentId)
        );
      });
    });
  }
}
