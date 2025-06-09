import { Component, inject, OnInit } from '@angular/core';
import { AuthService, signupResponse } from '../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  private _authSrv = inject(AuthService);
  private _settingsSrv = inject(SettingsService);

  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      username: new FormControl('', [Validators.required]),
      bio: new FormControl(''),
      image: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this._settingsSrv.setSettingsInitValues(this.form);
  }

  onLogout() {
    this._authSrv.logout();
  }

  onSubmit() {
    if (this.form.invalid) return;
    let formValues = this.form.value;
    let updatedUser = {
      user: {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        bio: formValues.bio,
        image: formValues.image,
      },
    };

    // console.log(updatedUser);
    let obs = {
      next: (updatedUser: signupResponse) => {
        this._authSrv.setUser(updatedUser.user);
      },
      error: (error) => console.error(error),
    };

    this._authSrv.updateUserInfo(updatedUser).subscribe(obs);
  }

  get formInvalid() {
    console.log(this.form, 'touched');

    return this.form.touched && this.form.invalid;
  }
}
