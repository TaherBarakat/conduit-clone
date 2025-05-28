import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArticleService } from '../../article/services/article.service';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { author } from '../../article/models/author.model';
export type comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: author;
};
@Injectable({
  providedIn: 'root',
})
export class CommentDataStorageService {
  private _httpSrv = inject(HttpClient);

  loadComments(slug: string): Observable<comment[]> {
    return this._httpSrv
      .get<{ comments: comment[] }>(
        `${environment.apiUrl}/articles/${slug}/comments`
      )
      .pipe(map((res) => res.comments));
  }

  postComment(slug: string, newComment: string) {
    let reqBody = { comment: { body: newComment } };
    return this._httpSrv
      .post<{ comment: comment }>(
        `${environment.apiUrl}/articles/${slug}/comments`,
        reqBody
      )
      .pipe(map((res) => res.comment));
  }

  deleteComment(slug: string, commentId: number) {
    return this._httpSrv.delete<{ comment: comment }>(
      `${environment.apiUrl}/articles/${slug}/comments/${commentId}`
    );
    // .pipe(map((res) => res.comment));
  }
}
