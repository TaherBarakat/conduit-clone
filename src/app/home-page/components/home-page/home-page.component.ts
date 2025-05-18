import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../../article/services/article.service';
// import {
//   ArticleParams,
//   DataStorageService} from ''
import { Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  ArticleDataStorageService,
  ArticleParams,
} from '../../../article/services/article-data-storage.service';
import { HomePageService } from '../../services/home-page.service';
import { IArticle } from '../../../article/models/article.model';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit, OnDestroy {
  private _articlesSrv = inject(ArticleService);
  private _homePageSrv = inject(HomePageService);
  private _dataStorageSrv = inject(ArticleDataStorageService);
  private route = inject(ActivatedRoute);

  articles: IArticle[] = this._articlesSrv.articles;
  articleSubscription = new Subscription();

  articlesCount: number;
  articlesCountSubscription = new Subscription();

  pagination = [];
  offset: number = 0;

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

    this.route.queryParams.subscribe((params) => {
      let articleParams = new ArticleParams({
        myFeed: params['my-feed'] ? true : false,
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
