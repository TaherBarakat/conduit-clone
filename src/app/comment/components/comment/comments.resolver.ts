import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ArticleService } from '../../../article/services/article.service';

import { map } from 'rxjs';
import { ArticleDataStorageService } from '../../../article/services/article-data-storage.service';
import {
  comment,
  CommentDataStorageService,
} from '../../services/comment-data-storage.service';

export const commentsResolver: ResolveFn<comment[]> = (route, state) => {
  let commentStr = inject(CommentDataStorageService);

  return commentStr
    .loadComments(route.params['article-slug'])
    .pipe(map((data) => data.comments));
};
