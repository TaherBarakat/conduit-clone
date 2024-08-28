import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { article, ArticlesService, comment } from './articles.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpSrv: HttpClient,
    private articleSrv: ArticlesService
  ) {}
  // offset = 0;

  loadArticles(offset: number = 0) {
    this.httpSrv
      .get<{
        articles: article[];
        articlesCount: number;
      }>(`${environment.apiUrl}/articles`, { params: { offset } })
      .subscribe((resData) => {
        console.log(resData.articlesCount);
        // ?limit=10&offset=0
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
