import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
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

type signupResponse = {
  user: user;
};

const TOKEN_KEY = 'conduit';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject(null);

  constructor(private httpSrv: HttpClient, private router: Router) {}

  setUser(user: user) {
    this.user.next(user);
    localStorage.setItem(TOKEN_KEY, user.token);
    this.router.navigate(['/home']);
  }
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.user.next(null);
    this.router.navigate(['/home']);
  }

  getToken() {
    // console.log('getToken');
    return localStorage.getItem(TOKEN_KEY);
  }

  signup(formData) {
    this.httpSrv
      .post<signupResponse>(`${environment.apiUrl}/users`, {
        user: { ...formData },
      })
      .pipe(map((resData) => resData.user))
      .subscribe((user) => {
        this.setUser(user);
      });
  }

  signin(formData) {
    this.httpSrv
      .post<signupResponse>(`${environment.apiUrl}/users/login`, {
        user: { ...formData },
      })
      .pipe(map((resData) => resData.user))
      .subscribe((user) => {
        this.setUser(user);
      });
  }

  getLoggedInUser() {
    if (this.getToken()) {
      this.httpSrv
        .get<signupResponse>(`${environment.apiUrl}/user`)
        .pipe(
          map((resData) => resData.user),
          catchError((message) => {
            localStorage.removeItem(TOKEN_KEY);
            return throwError(console.log(message));
          })
        )
        .subscribe((user) => {
          // console.log(user);
          // console.log('test test');
          this.setUser(user);
        });
    }
  }
}
