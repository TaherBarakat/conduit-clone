import { Component, Input } from '@angular/core';
import { article } from './articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {
  @Input('article') article: article;
}
