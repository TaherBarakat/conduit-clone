import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArticleService } from '../../article/services/article.service';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { author } from '../../article/models/author.model';
export interface IComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: author;
}
@Injectable({
  providedIn: 'root',
})
export class CommentDataStorageService {
  private _httpSrv = inject(HttpClient);

  loadComments(slug: string): Observable<IComment[]> {
    return this._httpSrv
      .get<{ comments: IComment[] }>(
        `${environment.apiUrl}/articles/${slug}/comments`
      )
      .pipe(
        map((res) =>
          res.comments.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        )
      );
  }

  postComment(slug: string, newComment: string) {
    let reqBody = { comment: { body: newComment } };
    console.log(reqBody);
    console.log(slug, newComment);
    return this._httpSrv
      .post<{ comment: IComment }>(
        `${environment.apiUrl}/articles/${slug}/comments`,
        reqBody
      )
      .pipe(map((res) => res.comment));
  }

  deleteComment(slug: string, commentId: number) {
    return this._httpSrv.delete(
      `${environment.apiUrl}/articles/${slug}/comments/${commentId}`
    );
    // .pipe(map((res) => res.comment));
  }
}
