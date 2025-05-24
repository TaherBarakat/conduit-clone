import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page.service';
import { ArticleService } from '../../../article/services/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.css',
})
export class TagsListComponent implements OnInit, OnDestroy {
  private _homePageSrv = inject(HomePageService);
  private _articleService = inject(ArticleService);

  tags: string[] = this._homePageSrv.tags;

  tagFilter?: string;
  tagSub: Subscription;

  ngOnInit(): void {
    this._homePageSrv.loadTags();
    this.tagSub = this._articleService.tagFilter$.subscribe((tag) => {
      this.tagFilter = tag;
    });
    this._articleService.setTagFilter(undefined, false);
  }

  onSetTagFilter(tag: string) {
    this._articleService.setTagFilter(tag, true);
  }

  ngOnDestroy(): void {
    this._articleService.setTagFilter(undefined, false);
    this.tagSub.unsubscribe();
  }
}
