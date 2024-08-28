import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(AuthService);
  const token = authSrv.getToken();
  const apiUrlsRequiringAuth = ['/user'];
  if (
    token &&
    authSrv.user &&
    apiUrlsRequiringAuth.some((url) => req.url.endsWith(url))
  ) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('NEEd Auth');
    return next(cloned);
  }

  return next(req);
};
