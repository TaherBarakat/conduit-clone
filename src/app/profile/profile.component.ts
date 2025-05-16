import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article/services/article.service';
// import {
// ArticleData
import {
  ArticleDataStorageService,
  ArticleParams,
} from '../article/services/article-data-storage.service';
import { Subscription } from 'rxjs';
import { article } from '../article/models/article.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isMyProfile = this;
  userName: string;
  articles: article[] = this._articlesSrv.articles;
  articleSubscription = new Subscription();

  articlesCount: number;
  articlesCountSubscription = new Subscription();

  pagination = [];
  offset: number = 0;

  constructor(
    private _articlesSrv: ArticleService,
    private _dataStorageSrv: ArticleDataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.articleSubscription = this._articlesSrv.articlesChanged.subscribe(
      (data) => {
        this.articles = data;
      }
    );

    this.articlesCountSubscription =
      this._articlesSrv.articlesCountChanged.subscribe((data) => {
        this.articlesCount = data;

        this.pagination = [];
        for (
          let offset = 0;
          offset < Math.ceil(this.articlesCount / 20);
          offset++
        ) {
          this.pagination.push(offset * 20);
        }
      });

    this.route.params.subscribe((params) => {
      this.userName = params['username'];
      console.log(this.userName);
    });

    this.route.queryParams.subscribe((params) => {
      let articleParams = new ArticleParams({
        author: this.userName,
        favorited: params['favorited'] ? true : false,
      });
      this._dataStorageSrv.loadArticles(articleParams);
    });
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.articlesCountSubscription.unsubscribe();
  }

  onSetOffset(offset) {
    this.offset = offset;
    let params = new ArticleParams({ offset: this.offset });
    this._dataStorageSrv.loadArticles(params);
  }
}
