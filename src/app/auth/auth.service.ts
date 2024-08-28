import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environments';
import { LocalizedString } from '@angular/compiler';
type user = {
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
  user: user;

  constructor(private httpSrv: HttpClient) {}

  setUser(user: user) {
    this.user = { ...user };
    localStorage.setItem(TOKEN_KEY, user.token);
  }

  getToken() {
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
    if (this.user) {
      this.httpSrv
        .get<signupResponse>(`${environment.apiUrl}/user`)
        .pipe(map((resData) => resData.user))
        .subscribe((user) => {
          this.setUser(user);
          // this.user = user;
          // console.log(this.user);
        });
    }
    console.log('getLoggedInUser');
  }
}
