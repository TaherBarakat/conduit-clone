import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

  articles$ = new Subject<IArticle[]>();
  pagination: number[] = [];
  // tagFilter: string;

  articleParams: ArticleParams;
  tagFilter$: Subject<string> = new Subject();

  setArticleParams(articleParams: ArticleParams) {
    this.articleParams = new ArticleParams(articleParams);
  }

  setTagFilter(tag: string, state: boolean) {
    this.articleParams.tag = this.articleParams.tag === tag ? undefined : tag;
    this.tagFilter$.next(this.articleParams.tag);
    if (state) this.setArticles();
  }

  setArticles() {
    console.log('setArticles');

    this._articleDataStrSrv.getArticles(this.articleParams).subscribe((res) => {
      this.articles$.next(res.articles);
      this._setArticleListPaginationDeities(
        this.articleParams,
        res.articlesCount
      );
    });
  }

  private _setArticleListPaginationDeities(
    articleParams: ArticleParams,
    articlesCount: number
  ) {
    this.pagination.length = 0;
    for (let set = 0; set < articlesCount; set += articleParams.limit) {
      this.pagination.push(set);
    }
  }

  articles: IArticle[] = [];

  getArticleBySlug(slug: string): Observable<IArticle> {
    return this._articleDataStrSrv.getArticleBySlug(slug);
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
  // toggleFavorite(){
  //   this
  // }
}
