import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TageService {
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

  tagFilter?: string;
  setTagFilter(tag: string) {
    this.tagFilter = tag;
  }
}
