import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ArticleService } from '../../../article/services/article.service';

import { map } from 'rxjs';
import { ArticleDataStorageService } from '../../../article/services/article-data-storage.service';
import {
  IComment,
  CommentDataStorageService,
} from '../../services/comment-data-storage.service';
import { CommentService } from '../../services/comment.service';

export const commentsResolver = (route, state) => {
  // let commentStr = inject(CommentDataStorageService);
  let commentSrv = inject(CommentService);

  commentSrv.setLocalComments(route.params['article-slug']);
};
