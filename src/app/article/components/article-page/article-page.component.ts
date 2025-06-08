import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { IArticle } from '../../models/article.model';
import { IComment } from '../../../comment/services/comment-data-storage.service';
import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
// import { ProfileService } from '../../../profile/services/profile.service';
import { ArticleService } from '../../services/article.service';
import { ArticleDataStorageService } from '../../services/article-data-storage.service';
import { CommentService } from '../../../comment/services/comment.service';

@Component({
  selector: 'app-article',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _auth = inject(AuthService);
  private _articleSrv = inject(ArticleService);
  private _articleDataStr = inject(ArticleDataStorageService);
  private _commentService = inject(CommentService);

  private dataSub!: Subscription;

  comments: Signal<IComment[]> = this._commentService.localComments$;
  article!: IArticle;
  isMyArticle!: boolean;

  ngOnInit() {
    // console.log(this.comments);
    this.dataSub = this._route.data.subscribe((data) => {
      this.article = data['article'];

      this.isMyArticle =
        this.article.author?.username === this._auth.user$.value?.username;
    });
  }

  onNavToAuthorProfile() {
    this._router.navigate(['/profile', this.article.author.username]);
  }
  onEditArticle() {
    this._router.navigate(['/editor', this.article.slug]);
  }
  onDeleteArticle() {
    this._articleSrv.removeArticle(this.article.slug);
  }

  onFollowUser() {
    let { username, following } = this.article.author;

    this._articleSrv
      .followArticleAuthor(username, following)
      .subscribe((followedProfile) => {
        this.article.author.following = followedProfile.following;
      });
  }

  onFavorite() {
    let { slug, favorited } = this.article;
    this._articleDataStr.favoriteArticle(slug, !favorited).subscribe((res) => {
      this.article.favorited = res.article.favorited;
      this.article.favoritesCount = res.article.favoritesCount;
    });
  }
  ngOnDestroy() {
    this.dataSub?.unsubscribe();
  }
}
