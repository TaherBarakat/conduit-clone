import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ModalService } from '../shared/services/modal.service';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const _auth = inject(AuthService);
  const _errorSrv = inject(ModalService);

  // return next(req);
  return next(req).pipe(
    // tap((req) => console.log('interrrrrrrr')),
    catchError((error: HttpErrorResponse) => {
      // console.log(error, 'itercepttttttt');

      if (error.status === 401) {
        console.warn('401 Unauthorized - Redirecting to login');
        router.navigate(['auth/signin']);
      }
      // else if (error.status === 422) {
      //   const errorsObj = error.error?.errors;
      //   let errorText: string = '';
      //   for (const error in errorsObj) {
      //     errorText += error + ': ' + errorsObj[error].join(',');
      //   }

      //   _errorSrv.showError(errorText);
      // }
      // else {
      // _errorSrv.showError(error.message);
      // }

      return throwError(() => error);
    })
  );
};
