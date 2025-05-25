import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArticleService } from './article.service';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environments';
import { IArticle } from '../models/article.model';
import { FormGroup } from '@angular/forms';
// import { environment } from '../../environments/environments';

export class ArticleParams {
  myFeed?: boolean;
  tag?: string;
  author?: string;
  favorited?: string;
  offset?: number;
  limit?: number;
  constructor({
    myFeed = false,
    tag,
    author,
    favorited,
    offset = 0,
    limit = 5,
  }: {
    myFeed?: boolean;
    tag?: string;
    author?: string;
    favorited?: string;
    offset?: number;
    limit?: number;
  }) {
    this.myFeed = myFeed;
    this.tag = tag;
    this.author = author;
    this.favorited = favorited;
    this.offset = offset;
    this.limit = limit;
  }

  getParams() {
    const params: any = {
      offset: this.offset,
      limit: this.limit,
    };

    if (!this.myFeed) {
      if (this.tag) params.tag = this.tag;
      if (this.author) params.author = this.author;
      if (this.favorited) params.favorited = this.favorited;
    }

    return { params };
  }
}
@Injectable({
  providedIn: 'root',
})
export class ArticleDataStorageService {
  private _httpSrv = inject(HttpClient);

  getArticles(params: ArticleParams): Observable<{
    articles: IArticle[];
    articlesCount: number;
  }> {
    console.log(params);
    return this._httpSrv
      .get<{
        articles: IArticle[];
        articlesCount: number;
      }>(
        `${environment.apiUrl}/articles${params.myFeed ? '/feed' : ''}`,
        params.getParams()
      )
      .pipe(
        tap((x) => {
          // console.log('articles');
          // console.log(x);
        })
      );
  }

  // Get recent articles globallY / Get recent articles from users you follow

  getArticleBySlug(articleSlug: string): Observable<IArticle> {
    return this._httpSrv
      .get<{
        article: IArticle;
      }>(`${environment.apiUrl}/articles/${articleSlug}`)
      .pipe(map((res) => res.article));
  }

  deleteArticle(articleSlug: string) {
    this._httpSrv
      .delete(`${environment.apiUrl}/articles/${articleSlug}`)
      .subscribe();
  }

  postArticle(articleInfo: {
    article: {
      title: string;
      description: string;
      body: string;
      tags?: string[];
    };
  }) {
    this._httpSrv
      .post<{
        article: IArticle;
      }>(`${environment.apiUrl}/articles`, articleInfo)
      .subscribe((res) => {
        // console.log(res);
      });
  }

  putArticle(articleInfo: {
    article: {
      title: string;
      description: string;
      body: string;
      tags?: string[];
    };
  }) {
    this._httpSrv
      .put<{
        article: IArticle;
      }>(`${environment.apiUrl}/articles`, articleInfo)
      .subscribe((res) => {
        // console.log(res);
      });
  }

  favoriteArticle(articleSlug: string, state: boolean) {
    const api = `${environment.apiUrl}/articles/${articleSlug}/favorite`;

    return state
      ? this._httpSrv.post<{
          article: IArticle;
        }>(api, {})
      : this._httpSrv.delete<{
          article: IArticle;
        }>(api);
  }
}
