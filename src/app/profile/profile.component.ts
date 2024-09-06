import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { article, ArticlesService } from '../shared/articles.service';
import {
  ArticleParams,
  DataStorageService,
} from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userName: string;
  articles: article[] = this.articlesSrv.articles;
  articleSubscription = new Subscription();

  articlesCount: number;
  articlesCountSubscription = new Subscription();

  pagination = [];
  offset: number = 0;

  constructor(
    private articlesSrv: ArticlesService,
    private dataStorageSrv: DataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.articleSubscription = this.articlesSrv.articlesChanged.subscribe(
      (data) => {
        this.articles = data;
      }
    );

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

    this.route.params.subscribe((params) => {
      this.userName = params['username'];
      console.log(this.userName);
    });

    this.route.queryParams.subscribe((params) => {
      let articleParams = new ArticleParams({
        author: this.userName,
        favorited: params['favorited'] ? true : false,
      });
      this.dataStorageSrv.loadArticles(articleParams);
    });
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.articlesCountSubscription.unsubscribe();
  }

  onSetOffset(offset) {
    this.offset = offset;
    let params = new ArticleParams({ offset: this.offset });
    this.dataStorageSrv.loadArticles(params);
  }
}
