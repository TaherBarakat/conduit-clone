import { Component, Input } from '@angular/core';
import { article } from '../../models/article.model';
// import { article } from '../../services/article.service';

@Component({
  selector: 'app-articles-item',
  templateUrl: './articles-list-item.component.html',
  styleUrl: './articles-list-item.component.css',
})
export class ArticlesListItemComponent {
  @Input('article') article: article;
  d() {
    // console.log('ffff');
  }
}
