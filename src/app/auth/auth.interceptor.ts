import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(AuthService);
  const token = authSrv.getToken();
  const apiUrlsRequiringAuth = [
    { method: 'GET', path: '/user' },
    { method: 'PUT', path: '/user' },
    { method: 'GET', path: '/articles/feed' },
    { method: 'POST', path: '/articles' },
    { method: 'POST', path: '/follow' },
    { method: 'DELETE', path: '/follow' },
  ];
  const apiUrlsKeyWordsRequiringAuth = [
    { method: 'GET', keyWord: '/profiles' },
  ];
  if (token && apiUrlsRequiringAuth.some((url) => req.url.endsWith(url.path))) {
    for (const api of apiUrlsRequiringAuth) {
      if (req.url.endsWith(api.path) && req.method === api.method) {
        console.log(req.url, req.method, 'need auth');

        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(cloned);
      }
    }
  }

  for (const api of apiUrlsKeyWordsRequiringAuth) {
    if (req.url.includes(api.keyWord) && req.method === api.method) {
      console.log(req.url, req.method, 'need auth');

      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(cloned);
    }
  }

  return next(req);
};
