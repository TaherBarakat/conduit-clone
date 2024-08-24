import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ArticlesService, comment } from '../../shared/articles.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { map } from 'rxjs';

export const commentsResolver: ResolveFn<comment[]> = (route, state) => {
  let dataStorageSrv = inject(DataStorageService);

  return dataStorageSrv
    .loadComments(route.params['article-slug'])
    .pipe(map((data) => data.comments));
};
