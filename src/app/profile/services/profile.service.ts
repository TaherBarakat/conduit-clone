import { inject, Injectable, ɵsetCurrentInjector } from '@angular/core';
import {
  ProfileDataStorageService,
  TProfile,
} from './profile-data-storage.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleDataStorageService } from '../../article/services/article-data-storage.service';
import { ArticleService } from '../../article/services/article.service';
import { AuthService, user } from '../../auth/auth.service';
import { concatMap, map, Observable, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _dataStorageSrv = inject(ArticleDataStorageService);
  private _articlesSrv = inject(ArticleService);
  // private route = inject(ActivatedRoute);
  private _authSrv = inject(AuthService);
  private _profileDataStr = inject(ProfileDataStorageService);
  username: string;

  profile: {
    profileDetails: TProfile;
    isMyProfile: boolean;
  };
  // setUserName() {
  //   return this.route.params.pipe(take(1));
  //   // .subscribe((params) => {
  //   // this.username = params['username'];
  //   // });
  // }
  getProfile(username: string): Observable<{
    profileDetails: TProfile;
    isMyProfile: boolean;
  }> {
    return this._profileDataStr.getProfile(username).pipe(
      switchMap((profile: TProfile) => {
        return this._authSrv.user$.pipe(
          take(1),
          map((currentUser) => ({
            profileDetails: profile,
            isMyProfile: currentUser?.username === profile.username,
          }))
        );
      })
    );
  }

  followProfile(
    username: string,
    state: boolean
  ): Observable<{
    profileDetails: TProfile;
    isMyProfile: boolean;
  }> {
    return this._profileDataStr.followProfile(username, !state).pipe(
      switchMap((profile: TProfile) => {
        return this._authSrv.user$.pipe(
          take(1),
          map((currentUser) => ({
            profileDetails: profile,
            isMyProfile: currentUser?.username === profile.username,
          }))
        );
      })
    );
  }
}
