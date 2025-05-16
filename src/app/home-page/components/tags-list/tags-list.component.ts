import { Component, inject } from '@angular/core';
import { HomePageService } from '../../services/home-page.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.css',
})
export class TagsListComponent {
  private _homePageSrv = inject(HomePageService);
  tags: string[] = this._homePageSrv.tags;

  ngOnInit(): void {
    this._homePageSrv.loadTags();
  }
}
