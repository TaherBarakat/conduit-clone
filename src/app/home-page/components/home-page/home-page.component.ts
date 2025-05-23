import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../../article/services/article.service';
// import {
//   ArticleParams,
//   DataStorageService} from ''
import { Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  ArticleDataStorageService,
  ArticleParams,
} from '../../../article/services/article-data-storage.service';
import { HomePageService } from '../../services/home-page.service';
import { IArticle } from '../../../article/models/article.model';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
