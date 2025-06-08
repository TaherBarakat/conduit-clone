import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomePageComponent } from './home-page/components/home-page/home-page.component';
// import { ArticlesItemComponent } from './home-page/articles-item/articles-item.component';
// import { ArticleComponent } from './article/article.component';
// IMPORT ArticlesItemComponent
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, withHashLocation } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
// import { ArticleComponent } from './article/article.component';
import { ArticlePageComponent } from './article/components/article-page/article-page.component';

import { CommentComponent } from './comment/components/comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './auth/auth.interceptor';
import { ProfileComponent } from './profile/components/profile-page/profile.component';
import { SettingsComponent } from './settings/settings.component';
// import { FavoritesComponent } from './profile/favorites/favorites.component';
import { ArticlesListItemComponent } from './article/components/articles-list/articles-list-item/articles-list-item.component';
import { ArticleFormComponent } from './article/components/article-form/article-form.component';
import { TagsListComponent } from './home-page/components/tags-list/tags-list.component';
import { ArticlesListComponent } from './article/components/articles-list/articles-list.component';
import { CommentFormComponent } from './comment/components/comment-form/comment-form.component';
import { unauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ErrorModalComponent } from './shared/components/modal/error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    ArticlesListItemComponent,
    SigninComponent,
    SignupComponent,
    ArticlePageComponent,
    CommentComponent,
    ProfileComponent,
    SettingsComponent,
    ArticleFormComponent,
    TagsListComponent,
    ArticlesListComponent,
    CommentFormComponent,
    ModalComponent,
    ErrorModalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // RouterModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, unauthorizedInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
