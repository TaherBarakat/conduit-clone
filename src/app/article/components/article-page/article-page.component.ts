import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArticle } from '../../models/article.model';
import { comment } from '../../../comment/services/comment-data-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  article!: IArticle;
  comments: comment[] = [];
  private dataSub!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.dataSub = this.route.data.subscribe((data) => {
      this.article = data['article'];
      this.comments = data['comments'];
    });
  }

  ngOnDestroy() {
    this.dataSub?.unsubscribe();
  }
}
