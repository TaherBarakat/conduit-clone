import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { article } from '../models/article.model';
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
  constructor(
    private httpSrv: HttpClient,
    private articleSrv: ArticleService
  ) {}
  // offset = 0;

  loadArticles(params: ArticleParams) {
    this.httpSrv
      .get<{
        articles: article[];
        articlesCount: number;
      }>(
        `${environment.apiUrl}/articles${params.myFeed ? '/feed' : ''}`,
        params.getParams()
      )
      .subscribe((resData) => {
        this.articleSrv.setArticlesCount(resData.articlesCount);
        this.articleSrv.setArticles(resData.articles);
      });
  }
}
