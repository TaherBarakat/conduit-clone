import { Component, Input, OnInit } from '@angular/core';
import { article } from '../../models/article.model';
// import { article } from '../../services/article.service';

@Component({
  selector: 'app-articles-item',
  templateUrl: './articles-list-item.component.html',
  styleUrl: './articles-list-item.component.css',
})
export class ArticlesListItemComponent implements OnInit {
  @Input('article') article: article;

  ngOnInit() {
    // console.log(this.article);
  }
}
