import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpSrv: HttpClient) {}

  user: user;

  signup(formData) {
    this.httpSrv
      .post<signupResponse>('https://api.realworld.io/api/users', {
        user: { ...formData },
      })
      .pipe(map((resData) => resData.user))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }
  signin(formData) {
    this.httpSrv
      .post<signupResponse>('https://api.realworld.io/api/users/login', {
        user: { ...formData },
      })
      .pipe(map((resData) => resData.user))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }

  getLoggedInUser() {
    if (this.user) {
      this.httpSrv
        .get<signupResponse>('https://api.realworld.io/api/user', {
          headers: { Authorization: `Bearer ${this.user.token}` },
        })
        .pipe(map((resData) => resData.user))
        .subscribe((user) => {
          this.user = user;
          console.log(this.user);
        });
    }
    console.log('getLoggedInUser');
  }
}
