import { Component, OnInit } from '@angular/core';
import { AuthService, user } from '../auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: user;
  authenticated: boolean = false;
  userSub: Subscription;

  constructor(private authSrv: AuthService) {}
  ngOnInit(): void {
    // let token=this.authSrv.getToken()
    this.userSub = this.authSrv.user.subscribe((user) => {
      console.log('sub');
      console.log(user);
      this.user = user;
      this.user ? (this.authenticated = true) : (this.authenticated = false);
    });

    this.authSrv.getLoggedInUser();
    // this.user ? this.authenticated === true : this.authenticated === false;
    // console.log(this.user, 'ddd');
    // console.log(this.authenticated);
  }
}
