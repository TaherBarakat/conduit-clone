import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const _auth = inject(AuthService);
  // return next(req)
  return next(req).pipe(
    // tap((req) => console.log('interrrrrrrr')),
    catchError((error) => {
      if (error.status === 401) {
        console.warn('401 Unauthorized - Redirecting to login');

        // Clear auth token if stored
        // _auth.logout();
        // Redirect to login page
        router.navigate(['auth/signin']);
      }

      return throwError(() => error);
    })
  );
};
