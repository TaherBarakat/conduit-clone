import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  constructor(private authSrv: AuthService) {}
  errors = [];
  ngOnInit(): void {
    this.authSrv.errors.subscribe((e) => (this.errors = e));
  }
  onSubmit(form: NgForm) {
    this.authSrv.signup(form.value);
  }
}
