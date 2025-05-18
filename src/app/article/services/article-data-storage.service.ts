import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { IArticle } from '../models/article.model';
import { FormGroup } from '@angular/forms';
// import { environment } from '../../environments/environments';

export class ArticleParams {
  1;
  myFeed?: boolean;
  tag?: string;
  author?: string;
  favorited?: boolean;
  offset?: number;
  limit?: number;
  constructor({
    myFeed = false,
    tag,
    author,
    favorited,
    offset = 0,
    limit = 20,
  }: {
    myFeed?: boolean;
    tag?: string;
    author?: string;
    favorited?: boolean;
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
  constructor() {} // private articleSrv: ArticleService
  // offset = 0;

  loadArticles(params: ArticleParams) {
    this._httpSrv
      .get<{
        articles: IArticle[];
        articlesCount: number;
      }>(
        `${environment.apiUrl}/articles${params.myFeed ? '/feed' : ''}`,
        params.getParams()
      )
      .subscribe((resData) => {
        // this.articleSrv.setArticlesCount(resData.articlesCount);
        // this.articleSrv.setArticles(resData.articles);
      });
  }

  getArticles(isMyFeed: boolean): Observable<{
    articles: IArticle[];
    articlesCount: number;
  }> {
    return this._httpSrv.get<{
      articles: IArticle[];
      articlesCount: number;
    }>(`${environment.apiUrl}/articles${isMyFeed && '/feed'}`);
  }

  getArticle(articleSlug: string): Observable<{ article: IArticle[] }> {
    return this._httpSrv.get<{
      article: IArticle[];
    }>(`${environment.apiUrl}/articles/${articleSlug}`);
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
      .post<IArticle>(`${environment.apiUrl}/articles`, articleInfo)
      .subscribe((res) => {
        console.log(res);
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
      .put<IArticle>(`${environment.apiUrl}/articles`, articleInfo)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
