import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};
export type article = {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: author;
};

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
export class ArticlesService {
  articles: article[] = [];
  articlesChanged = new Subject<article[]>();

  articlesCount: number = 0;
  articlesCountChanged = new Subject<number>();

  tags: string[];
  tagsChanged = new Subject<string[]>();

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
  setTags(tags: string[]) {
    this.tags = tags;
    this.tagsChanged.next(tags);
  }
}
