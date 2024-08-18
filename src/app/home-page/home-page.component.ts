import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from './article/articles.service';
import { article } from './article/articles.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
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

  constructor(
    private articlesSrv: ArticlesService,
    private dataStorageSrv: DataStorageService
  ) {}

  ngOnInit(): void {
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
        this.pagination.length = Math.ceil(this.articlesCount / 10);
        console.log(this.pagination);
        // console.log();
      });

    this.dataStorageSrv.loadArticles();
    this.dataStorageSrv.loadTags();
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
    this.articlesCountSubscription.unsubscribe();
    this.tagsSubscription.unsubscribe();
  }
}
