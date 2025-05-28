import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { IArticle } from '../../../models/article.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticleDataStorageService } from '../../../services/article-data-storage.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ArticleService } from '../../../services/article.service';
// import { article } from '../../services/article.service';

@Component({
  selector: 'app-articles-item',
  templateUrl: './articles-list-item.component.html',
  styleUrl: './articles-list-item.component.css',
})
export class ArticlesListItemComponent implements OnInit {
  @Input('article') article: IArticle;
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _articleDataStr = inject(ArticleDataStorageService);
  private _articleSrv = inject(ArticleService);

  ngOnInit() {
    // console.log(this.article);
  }
  onFavorite() {
    // console.log(this.article.favorited);
    this._articleDataStr
      .favoriteArticle(this.article.slug, !this.article.favorited)
      .subscribe((res) => {
        this.article.favorited = res.article.favorited;
        this.article.favoritesCount = res.article.favoritesCount;
        if (this._route.snapshot.queryParams['favorited'])
          this._articleSrv.setArticles();
      });
  }
  onNavToAuthor() {
    this._router.navigate(['/profile', this.article.author.username]);
  }
  onNavToReadArticle() {
    this._router.navigate(['/article', this.article.slug]);
  }
}
