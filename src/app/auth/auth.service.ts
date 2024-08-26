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
      .post<signupResponse>('https://api.realworld.io/api/users', formData)
      .pipe(map((resData) => resData.user))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }
  signin(formData) {
    this.httpSrv
      .post<signupResponse>(
        'https://api.realworld.io/api/users/login',
        formData
      )
      .pipe(map((resData) => resData.user))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }

  getLoggedInUser() {
    console.log('getLoggedInUser');

    this.httpSrv
      .get<signupResponse>('https://api.realworld.io/api/user')
      .pipe(map((resData) => resData.user))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }
}
