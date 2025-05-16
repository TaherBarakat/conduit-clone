import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  private _httpSrv = inject(HttpClient);
  private _tags: string[] = [];
  private set _setTags(tags: string[]) {
    this._tags.push(...tags);
  }
  get tags() {
    return this._tags;
  }

  loadTags() {
    this._tags.length = 0;
    this._httpSrv
      .get<{ tags: string[] }>(`${environment.apiUrl}/tags`)
      .subscribe((resData) => {
        this._setTags = resData.tags;
      });
  }
}
