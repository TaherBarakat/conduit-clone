import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticlesItemComponent } from './home-page/articles-item/articles-item.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ArticleComponent } from './article/article.component';
import { CommentComponent } from './article/comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ArticleComponent } from '../article/article.component';
// import { CommentComponent } from '../article/comment/comment.component';
// import { ArticleViewComponent } from './article-view/article-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    ArticlesItemComponent,
    SigninComponent,
    SignupComponent,
    ArticleComponent,
    // ArticleComponent,
    CommentComponent,
    // CommentComponent,
    // ArticleViewComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
