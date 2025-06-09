import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService, user } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _authSrv = inject(AuthService);

  setSettingsInitValues(
    form: FormGroup<{
      email: FormControl<string>;
      password: FormControl<string>;
      username: FormControl<string>;
      bio: FormControl<string>;
      image: FormControl<string>;
    }>
  ) {
    this._authSrv.user$.subscribe((currentUerInfo: user) => {
      console.log(currentUerInfo, 'current');
      form.patchValue({ ...currentUerInfo });
    });
  }
}
