import { Component, OnDestroy, OnInit } from '@angular/core';
// import { article, ArticlesService, comment } from '../shared/articles.service';
import { ActivatedRoute, Route } from '@angular/router';
// import { DataStorageService } from '../shared/data-storage.service';
import { map, Observable, Subscription } from 'rxjs';
import {
  // article,
  ArticleService,
  // comment,
} from '../../services/article.service';
import { IArticle } from '../../models/article.model';
import { comment } from '../../../comment/services/comment-data-storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css',
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  article: IArticle;
  comments: comment[] = [];

  commentsSub: Subscription;

  constructor(
    private articleSrv: ArticleService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const articleSlug = this.actRoute.snapshot.paramMap.get('article-slug');

    this.article = this.articleSrv.getArticleBySlug(articleSlug);

    this.commentsSub = this.actRoute.data.subscribe((data) => {
      // console.log(data);
      this.comments = data.comments;
    });
  }
  ngOnDestroy(): void {
    this.commentsSub.unsubscribe();
  }
}
