import { Component, OnDestroy, OnInit } from '@angular/core';
import { article, ArticlesService, comment } from '../shared/articles.service';
import { ActivatedRoute, Route } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit, OnDestroy {
  article: article;
  comments: comment[] = [];

  commentsSub: Subscription;

  constructor(
    private articleSrv: ArticlesService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const articleSlug = this.actRoute.snapshot.paramMap.get('article-slug');

    this.article = this.articleSrv.getArticleBySlug(articleSlug);

    this.commentsSub = this.actRoute.data.subscribe((data) => {
      console.log(data);
      this.comments = data.comments;
    });
  }
  ngOnDestroy(): void {
    this.commentsSub.unsubscribe();
  }
}
