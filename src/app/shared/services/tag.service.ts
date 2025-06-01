import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private _httpSrv = inject(HttpClient);
  tags$ = signal<string[]>([]);

  private set _setTags(tags: string[]) {
    this.tags$.set(tags);
  }

  loadTags() {
    this._httpSrv
      .get<{ tags: string[] }>(`${environment.apiUrl}/tags`)
      .subscribe((resData) => {
        this._setTags = resData.tags;
      });
  }
}
