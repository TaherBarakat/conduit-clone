import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  article,
  ArticlesService,
} from '../home-page/article/articles.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpSrv: HttpClient,
    private articleSrv: ArticlesService
  ) {}

  loadArticles() {
    this.httpSrv
      .get<{
        articles: article[];
        articlesCount: number;
      }>('https://api.realworld.io/api/articles')
      .subscribe((resData) => {
        console.log(resData.articlesCount);
        // ?limit=10&offset=0
        this.articleSrv.setArticlesCount(resData.articlesCount);
        this.articleSrv.setArticles(resData.articles);
      });
  }

  loadTags() {
    this.httpSrv
      .get<{ tags: string[] }>('https://api.realworld.io/api/tags')
      .subscribe((resData) => {
        this.articleSrv.setTags(resData.tags);
      });
  }
}
