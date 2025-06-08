import { HttpClient } from '@angular/common/http';
import {
  Inject,
  inject,
  Injectable,
  ɵCONTAINER_HEADER_OFFSET,
} from '@angular/core';
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
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ModalService } from '../../shared/services/modal.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _articleDataStr = inject(ArticleDataStorageService);
  private _profileDataStr = inject(ProfileDataStorageService);
  private _articleParams: ArticleParams;
  private;
  articles$ = new Subject<IArticle[]>();
  pagination$ = new Subject<number[]>();
  tagFilter$: Subject<string> = new Subject();

  setArticleParams(articleParams: ArticleParams) {
    this._articleParams = new ArticleParams(articleParams);
  }

  setTagFilter(tag: string, state: boolean) {
    this._articleParams.tag = this._articleParams.tag === tag ? undefined : tag;
    this.tagFilter$.next(this._articleParams.tag);
    this._articleParams.offset = 0;
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

  submitArticleForm(
    articleInfo: articleForm,
    editMode: boolean,
    articlePreviousSlug: string
  ) {
    // console.log(articleInfo, editMode);
    const { body, description, title, tagList } = articleInfo.value;

    const article = {
      body,
      description,
      title,
      tagList,
    };

    const request = editMode
      ? this._articleDataStr.putArticle({ article }, articlePreviousSlug)
      : this._articleDataStr.postArticle({ article });

    return request;
  }
  // toggleFavorite(){
  //   this
  // }

  followArticleAuthor(username: string, state: boolean) {
    return this._profileDataStr.followProfile(username, !state);
  }
  private _modalSrv = inject(ModalService);
  private _location = inject(Location);

  removeArticle(articleSlug: string) {
    this._modalSrv.showConformMessage(
      'you sure you want to delete  the current article?'
    );

    this._modalSrv.setFunctionality(() => {
      this._articleDataStr.deleteArticle(articleSlug);
      this._location.back(); // 🔙 Go back one step in history
    });
  }
}
