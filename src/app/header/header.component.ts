import { Component, OnInit } from '@angular/core';
import { AuthService, user } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: user;
  authenticated: boolean;

  constructor(private authSrv: AuthService) {}
  ngOnInit(): void {
    this.authSrv.getLoggedInUser();
    this.authSrv.user
      ? this.authenticated === true
      : this.authenticated === false;
  }
}
