import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  constructor(private authSrv: AuthService) {}
  errors = [];
  ngOnInit(): void {
    this.authSrv.errors.subscribe((e) => (this.errors = e));
  }
  onSubmit(form: NgForm) {
    this.authSrv.signin(form.value);
  }
}
