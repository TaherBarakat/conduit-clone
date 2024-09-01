import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from '../shared/articles.service';
import { article } from '../shared/articles.service';
import {
  ArticleParams,
  DataStorageService,
} from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit, OnDestroy {
  articles: article[] = this.articlesSrv.articles;
  articleSubscription = new Subscription();

  articlesCount: number;
  articlesCountSubscription = new Subscription();

  tags: string[];
  tagsSubscription = new Subscription();

  pagination = [];
  offset: number = 0;

  constructor(
    private articlesSrv: ArticlesService,
    private dataStorageSrv: DataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.offset = 0;

    this.articleSubscription = this.articlesSrv.articlesChanged.subscribe(
      (data) => {
        this.articles = data;
      }
    );

    this.tagsSubscription = this.articlesSrv.tagsChanged.subscribe((data) => {
      this.tags = data;
    });

    this.articlesCountSubscription =
      this.articlesSrv.articlesCountChanged.subscribe((data) => {
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
      // console.log(params['my-feed']);
      let articleParams = new ArticleParams({
        myFeed: params['my-feed'] ? true : false,
      });
      // console.log(articleParams.getParams());
      this.dataStorageSrv.loadArticles(articleParams);
    });
    this.dataStorageSrv.loadTags();
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.articlesCountSubscription.unsubscribe();
    this.tagsSubscription.unsubscribe();
  }
  onSetOffset(offset) {
    this.offset = offset;
    let params = new ArticleParams({ offset: this.offset });
    this.dataStorageSrv.loadArticles(params);
  }
}
