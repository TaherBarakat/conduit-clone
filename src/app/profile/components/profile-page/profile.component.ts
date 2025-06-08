import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../article/services/article.service';
// import {
// ArticleData
import {
  ArticleDataStorageService,
  ArticleParams,
} from '../../../article/services/article-data-storage.service';
import { Subscription, take } from 'rxjs';
import { IArticle } from '../../../article/models/article.model';
import { AuthService, user } from '../../../auth/auth.service';
import { CurrencyPipe } from '@angular/common';
import {
  ProfileDataStorageService,
  TProfile,
} from '../../services/profile-data-storage.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private _dataStorageSrv = inject(ArticleDataStorageService);
  private _articlesSrv = inject(ArticleService);
  private route = inject(ActivatedRoute);
  private _authSrv = inject(AuthService);
  private _profileSrv = inject(ProfileService);

  profile!: {
    profileDetails?: TProfile;
    isMyProfile: boolean;
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const username = params['username'];
      this._profileSrv.getProfile(username).subscribe((result) => {
        this.profile = result;
      });
    });
  }

  ngOnDestroy() {}
  onFollow() {
    this._profileSrv
      .followProfile(
        this.profile.profileDetails.username,
        this.profile.profileDetails.following
      )
      .pipe(take(1))
      .subscribe((result) => {
        this.profile = result;
      });
  }
}
