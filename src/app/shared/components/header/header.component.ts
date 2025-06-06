import { Component, OnInit } from '@angular/core';
import { AuthService, user } from '../../../auth/auth.service';
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

  isMenu: boolean = false;
  constructor(private authSrv: AuthService) {}
  onToggleMenu() {
    this.isMenu = !this.isMenu;
  }
  ngOnInit(): void {
    this.authSrv.getLoggedInUser();

    this.userSub = this.authSrv.user$.subscribe((user) => {
      this.user = user;
      this.user ? (this.authenticated = true) : (this.authenticated = false);
    });
  }
}
