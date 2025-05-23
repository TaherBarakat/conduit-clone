import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { HomePageService } from '../../../home-page/services/home-page.service';
import { IArticle } from '../../models/article.model';
import {
  ArticleDataStorageService,
  ArticleParams,
} from '../../services/article-data-storage.service';
import { ArticleService } from '../../services/article.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.css',
})
export class ArticlesListComponent implements OnInit {
  private _articlesSrv = inject(ArticleService);
  private _articleDataStr = inject(ArticleDataStorageService);
  private route = inject(ActivatedRoute);

  private _routeSub = new Subscription();

  articleParams = new ArticleParams({});

  articles$: Subject<IArticle[]> = this._articlesSrv.articles$;
  pagination = this._articlesSrv.pagination;

  ngOnInit(): void {
    this._routeSub = combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
      this.route.url,
    ]).subscribe(([params, queryParams, urlSegments]) => {
      const username = params.get('username'); // Path param
      const isMyFeed = queryParams.get('my-feed'); // Query param
      const isFavorited = queryParams.get('favorited'); // Query param
      const page: 'home' | 'profile' | undefined = urlSegments[0]?.path as any;
      // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
      if (username) {
        this.articleParams.favorited = undefined;
        this.articleParams.author = username;
      }
      // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
      if (isFavorited == 'true') {
        this.articleParams.favorited = username;
        this.articleParams.author = undefined;
      }
      // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
      this.articleParams.myFeed = isMyFeed === 'true';
      // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
      this.articleParams.offset = 0;
      this._articlesSrv.setArticles(this.articleParams);
    });
  }

  onSetOffset(offset) {
    this.articleParams.offset = offset;
    this._articlesSrv.setArticles(this.articleParams);
  }
}
