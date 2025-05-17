import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
export type TProfile = {
  profile: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};
@Injectable({
  providedIn: 'root',
})
export class ProfileDataStorageService {
  private _httpSrv = inject(HttpClient);

  getProfile(username: string) {
    return this._httpSrv.get<TProfile>(
      `${environment.apiUrl}/profiles/${username}`
    );
  }
  followProfile(username: string, state: boolean) {
    return state
      ? this._httpSrv.post<TProfile>(
          `${environment.apiUrl}/profiles/${username}/follow`,
          {}
        )
      : this._httpSrv.delete<TProfile>(
          `${environment.apiUrl}/profiles/${username}/follow`
        );
  }
}
