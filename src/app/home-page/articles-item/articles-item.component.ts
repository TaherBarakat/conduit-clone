import { Component, Input } from '@angular/core';
import { article } from '../../shared/articles.service';

@Component({
  selector: 'app-articles-item',
  templateUrl: './articles-item.component.html',
  styleUrl: './articles-item.component.css',
})
export class ArticlesItemComponent {
  @Input('article') article: article;
  d() {
    console.log('ffff');
  }
}
