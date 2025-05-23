import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { IArticle } from '../../../models/article.model';
import { Router } from '@angular/router';
import { ArticleDataStorageService } from '../../../services/article-data-storage.service';
// import { article } from '../../services/article.service';

@Component({
  selector: 'app-articles-item',
  templateUrl: './articles-list-item.component.html',
  styleUrl: './articles-list-item.component.css',
})
export class ArticlesListItemComponent implements OnInit {
  @Input('article') article: IArticle;
  private _router = inject(Router);
  private _articleDataStr = inject(ArticleDataStorageService);
  ngOnInit() {
    // console.log(this.article);
  }
  onFavorite() {
    console.log(this.article.favorited);
    this._articleDataStr
      .favoriteArticle(this.article.slug, !this.article.favorited)
      .subscribe((res) => {
        this.article.favorited = res.article.favorited;
        this.article.favoritesCount = res.article.favoritesCount;
      });
  }
  onNavToAuthor() {
    this._router.navigate(['/profile', this.article.author.username]);
  }
  onNavToReadArticle() {
    this._router.navigate(['/article', this.article.slug]);
  }
}
