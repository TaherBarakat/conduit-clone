import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ArticleComponent } from './article/article.component';
import { commentsResolver } from './article/comment/comments.resolver';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    component: HomePageComponent,
    path: 'home',
  },
  {
    path: 'auth',
    children: [
      {
        component: SigninComponent,
        path: 'signin',
      },
      {
        component: SignupComponent,
        path: 'signup',
      },
    ],
  },
  {
    component: ArticleComponent,
    path: 'article/:article-slug',
    resolve: {
      comments: commentsResolver,
    },
  },
  {
    component: SettingsComponent,
    path: 'settings',
  },
  {
    component: ProfileComponent,
    path: 'profile/:username',
    // children: [
    //   {
    //     path: '/favorites',
    //     component:,
    //   },
    // ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
