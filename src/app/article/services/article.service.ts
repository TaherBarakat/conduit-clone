import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IArticle } from '../models/article.model';
import { ArticleDataStorageService } from './article-data-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { articleForm } from '../models/articleForm.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _articleDataStrSrv = inject(ArticleDataStorageService);
  articles: IArticle[] = [];
  articlesChanged = new Subject<IArticle[]>();

  articlesCount: number = 0;
  articlesCountChanged = new Subject<number>();

  setArticles(articles: IArticle[]) {
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
    let article: IArticle = this.articles.filter(
      (article) => article.slug === slug
    )[0];

    return article;
  }

  submitArticleForm(articleInfo: articleForm, editMode: boolean) {
    // console.log(articleInfo, editMode);
    const { body, description, title, tags } = articleInfo.value;

    const article = {
      body,
      description,
      title,
      ...(editMode ? {} : { tags }), // include tags only when not editing
    };

    const request = editMode
      ? this._articleDataStrSrv.putArticle({ article })
      : this._articleDataStrSrv.postArticle({ article });

    return request;
  }
}
