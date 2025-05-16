import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: article[] = [];
  articlesChanged = new Subject<article[]>();

  articlesCount: number = 0;
  articlesCountChanged = new Subject<number>();

  constructor() {}

  setArticles(articles: article[]) {
    this.articles = [...articles];
    this.articlesChanged.next(this.articles);
  }

  setArticlesCount(articlesCount: number) {
    this.articlesCount = articlesCount;
    this.articlesCountChanged.next(this.articlesCount);
  }

  getAllArticles() {
    return this.articles.slice();
  }
  getArticleBySlug(slug: string) {
    let article: article = this.articles.filter(
      (article) => article.slug === slug
    )[0];

    return article;
  }
}
