import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/components/home-page/home-page.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ArticlePageComponent } from './article/components/article-page/article-page.component';
import { commentsResolver } from './comment/components/comment/comments.resolver';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/components/profile-page/profile.component';
import { ArticleFormComponent } from './article/components/article-form/article-form.component';

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
    component: ArticlePageComponent,
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
  },

  {
    component: ArticleFormComponent,
    path: 'editor/:article-slug',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
