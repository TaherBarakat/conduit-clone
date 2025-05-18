import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environments';
import { article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-editor-page',
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
})
export class ArticleFormComponent implements OnInit {
  private _articleSrv = inject(ArticleService);
  private _route = inject(ActivatedRoute);
  private _httpSrv = inject(HttpClient);

  editMode: boolean = false;
  articleForm: FormGroup;

  ngOnInit() {
    this.intForm();
  }

  intForm() {
    this._route.params.subscribe((params) => {
      if (params['article-slug']) this.editMode = false;
    });

    let title = new FormControl('', [Validators.required]);
    let description = new FormControl('', [Validators.required]);
    let body = new FormControl('', [Validators.required]);
    let tags = new FormArray([]);
    this.articleForm = new FormGroup({ title, description, body, tags });
  }

  onSubmit() {
    this._articleSrv.submitArticleForm(this.articleForm.value, this.editMode);
  }
}
