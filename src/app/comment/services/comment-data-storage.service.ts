import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArticleService } from '../../article/services/article.service';
import { Observable } from 'rxjs';
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
  loadComments(slug: string): Observable<{ comments: comment[] }> {
    return this._httpSrv.get<{ comments: comment[] }>(
      `${environment.apiUrl}/articles/${slug}/comments`
    );
  }
} // constructor() {}
