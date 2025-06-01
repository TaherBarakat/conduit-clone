import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { IArticle } from '../models/article.model';
import {
  ArticleDataStorageService,
  ArticleParams,
} from './article-data-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { articleForm } from '../models/articleForm.model';
import { ThisReceiver } from '@angular/compiler';
import { ProfileDataStorageService } from '../../profile/services/profile-data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _articleDataStr = inject(ArticleDataStorageService);
  private _profileDataStr = inject(ProfileDataStorageService);
  private _articleParams: ArticleParams;

  articles$ = new Subject<IArticle[]>();
  pagination$ = new Subject<number[]>();
  tagFilter$: Subject<string> = new Subject();

  setArticleParams(articleParams: ArticleParams) {
    this._articleParams = new ArticleParams(articleParams);
  }

  setTagFilter(tag: string, state: boolean) {
    this._articleParams.tag = this._articleParams.tag === tag ? undefined : tag;
    this.tagFilter$.next(this._articleParams.tag);
    if (state) this.setArticles();
  }

  setArticles() {
    // console.log('setArticles');

    this._articleDataStr.getArticles(this._articleParams).subscribe((res) => {
      this.articles$.next(res.articles);
      this._setArticleListPaginationDeities(
        this._articleParams,
        res.articlesCount
      );
    });
  }

  private _setArticleListPaginationDeities(
    articleParams: ArticleParams,
    articlesCount: number
  ) {
    let pagination = [];
    // this.pagination.length = 0;
    for (let set = 0; set < articlesCount; set += articleParams.limit) {
      pagination.push(set);
    }
    this.pagination$.next(pagination);
  }

  // articles: IArticle[] = [];

  getArticleBySlug(slug: string): Observable<IArticle> {
    return this._articleDataStr.getArticleBySlug(slug);
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
      ? this._articleDataStr.putArticle({ article })
      : this._articleDataStr.postArticle({ article });

    return request;
  }
  // toggleFavorite(){
  //   this
  // }

  followArticleAuthor(username: string, state: boolean) {
    return this._profileDataStr.followProfile(username, !state);
  }
}
