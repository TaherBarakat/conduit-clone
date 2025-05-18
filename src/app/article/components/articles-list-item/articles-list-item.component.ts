import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from '../../models/article.model';
// import { article } from '../../services/article.service';

@Component({
  selector: 'app-articles-item',
  templateUrl: './articles-list-item.component.html',
  styleUrl: './articles-list-item.component.css',
})
export class ArticlesListItemComponent implements OnInit {
  @Input('article') article: IArticle;

  ngOnInit() {
    // console.log(this.article);
  }
}
