import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { map } from 'rxjs';
export type TProfile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};
@Injectable({
  providedIn: 'root',
})
export class ProfileDataStorageService {
  private _httpSrv = inject(HttpClient);

  getProfile(username: string) {
    return this._httpSrv
      .get<{ profile: TProfile }>(`${environment.apiUrl}/profiles/${username}`)
      .pipe(map((profileRes) => profileRes.profile));
  }
  followProfile(username: string, state: boolean) {
    return state
      ? this._httpSrv
          .post<{ profile: TProfile }>(
            `${environment.apiUrl}/profiles/${username}/follow`,
            {}
          )
          .pipe(map((profileRes) => profileRes.profile))
      : this._httpSrv
          .delete<{ profile: TProfile }>(
            `${environment.apiUrl}/profiles/${username}/follow`
          )
          .pipe(map((profileRes) => profileRes.profile));
  }
}
