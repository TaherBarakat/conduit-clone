import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { article, ArticlesService, comment } from './articles.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export class ArticleParams {
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
export class DataStorageService {
  constructor(
    private httpSrv: HttpClient,
    private articleSrv: ArticlesService
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

  loadTags() {
    this.httpSrv
      .get<{ tags: string[] }>(`${environment.apiUrl}/tags`)
      .subscribe((resData) => {
        this.articleSrv.setTags(resData.tags);
      });
  }

  loadComments(slug: string): Observable<{ comments: comment[] }> {
    return this.httpSrv.get<{ comments: comment[] }>(
      `${environment.apiUrl}/articles/${slug}/comments`
    );
  }
}
