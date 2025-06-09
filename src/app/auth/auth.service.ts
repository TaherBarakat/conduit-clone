import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environments';
import { LocalizedString } from '@angular/compiler';
import { Router } from '@angular/router';
export type user = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

export type signupResponse = {
  user: user;
};
export type setUserForm = {
  user: {
    email: string;
    password: string;
    username: string;
    bio: string;
    image: string;
  };
};

const TOKEN_KEY = 'CONDUIT';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<user>(null);
  private _httpSrv = inject(HttpClient);
  private _router = inject(Router);

  setUser(user: user) {
    localStorage.setItem(TOKEN_KEY, user.token);
    this.user$.next(user);
    this._router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.user$.next(null);
    this._router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  // errorsList: string[] = [];/
  errors = new Subject<string[]>();
  handleErrors(error) {
    let errorsList = [];
    Object.keys(error.error.errors).map((key) => {
      errorsList.push(`${key}: ${error.error.errors[key].join(', ')}`);
      this.errors.next(errorsList);
    });
  }
  signup(formData) {
    return this._httpSrv
      .post<signupResponse>(`${environment.apiUrl}/users`, {
        user: { ...formData },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleErrors(error);
          return throwError(() => error);
        }),

        map((resData) => resData.user)
      )
      .subscribe((user) => {
        this.setUser(user);
      });
  }
  signin(formData) {
    return this._httpSrv
      .post<signupResponse>(`${environment.apiUrl}/users/login`, {
        user: { ...formData },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleErrors(error);
          return throwError(() => error);
        }),

        map((resData) => resData.user)
      )
      .subscribe((user) => {
        this.setUser(user);
      });
  }

  getLoggedInUser() {
    if (this.getToken()) {
      console.log(this.getToken(), 'token');
      this._httpSrv
        .get<signupResponse>(`${environment.apiUrl}/user`)
        .pipe(
          // tap((res) => console.log(res, 'resssssssssssssssss')),
          map((resData) => resData.user),
          catchError((message) => {
            localStorage.removeItem(TOKEN_KEY);
            return throwError(console.log(message));
          })
        )
        .subscribe((user) => {
          this.setUser(user);
        });
    } else this.user$.next(null);
  }
  updateUserInfo(userInfo: setUserForm) {
    return this._httpSrv.put<signupResponse>(
      `${environment.apiUrl}/user`,
      userInfo
    );
  }
}
