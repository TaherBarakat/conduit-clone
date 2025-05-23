import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IArticle } from '../models/article.model';
import {
  ArticleDataStorageService,
  ArticleParams,
} from './article-data-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { articleForm } from '../models/articleForm.model';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _articleDataStrSrv = inject(ArticleDataStorageService);
  articles: IArticle[] = [];
  articlesCount: number = 0;

  pagination: number[] = [];
  offset: number = 0;

  // articlesChanged = new Subject<IArticle[]>();

  // articlesCountChanged = new Subject<number>();

  setArticles(articleParams: ArticleParams) {
    this._articleDataStrSrv.getArticles(articleParams).subscribe((res) => {
      this.articles.length = 0;
      this.articles.push(...res.articles);
      this.articlesCount = res.articlesCount;
      this._setArticleListPaginationDeities(articleParams);
    });
  }

  private _setArticleListPaginationDeities(articleParams: ArticleParams) {
    this.pagination.length = 0;

    for (let set = 0; set < this.articlesCount; set += articleParams.limit) {
      // console.log(set, 'set');
      this.pagination.push(set);
    }
    this.offset = articleParams.offset;
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
