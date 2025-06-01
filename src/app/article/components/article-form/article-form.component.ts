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
import { IArticle } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { TagService as TagService } from '../../../shared/services/tag.service';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-editor-page',
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
})
export class ArticleFormComponent implements OnInit {
  private _articleSrv = inject(ArticleService);
  private _route = inject(ActivatedRoute);
  private _httpSrv = inject(HttpClient);
  private _tagSrv = inject(TagService);

  editMode: boolean = false;
  articleForm: FormGroup;
  availableTags = this._tagSrv.tags$;
  selectedTags: string[] = ['dd', 'age'];
  ngOnInit() {
    this._tagSrv.loadTags();
    this.intForm();
  }

  intForm() {
    this._route.params.subscribe((params) => {
      if (params['article-slug']) this.editMode = false;
    });

    let title = new FormControl('', [Validators.required]);
    let description = new FormControl('', [Validators.required]);
    let body = new FormControl('', [Validators.required]);
    let tagList = new FormControl(this.selectedTags);
    this.articleForm = new FormGroup({ title, description, body, tagList });
  }

  onSubmit() {
    console.log(this.articleForm.value);
    // console.log(this.a);
    this._articleSrv.submitArticleForm(this.articleForm, this.editMode);
  }
}
