import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environments';
import { IArticle } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { TagService as TagService } from '../../../shared/services/tag.service';
import { Location } from '@angular/common';
import { catchError, Subscriber, throwError } from 'rxjs';
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
  private _router = inject(Router);

  editMode: boolean = false;
  articleForm: FormGroup;
  availableTags = this._tagSrv.tags$;
  selectedTags: string[] = [];
  tagInput = new FormControl('');
  filteredTags: string[] = [];
  showSuggestions: boolean = false;

  editedArticleSlug?: string;
  ngOnInit() {
    this._tagSrv.loadTags();
    this.initForm();

    this.articleForm.valueChanges.subscribe((x) => {
      console.log('change');
      this.errors = [];
    });
  }

  initForm() {
    let title = new FormControl('', [Validators.required]);
    let description = new FormControl('', [Validators.required]);
    let body = new FormControl('', [Validators.required]);
    let tagList = new FormControl(this.selectedTags);
    this.articleForm = new FormGroup({ title, description, body, tagList });

    this._route.params.subscribe((params) => {
      // console.log(params);
      this.editedArticleSlug = params['articleSlug'];
      if (this.editedArticleSlug) {
        this.editMode = true;

        this._articleSrv
          .getArticleBySlug(this.editedArticleSlug)
          .subscribe((loadedArticle) => {
            console.log(loadedArticle);

            this.articleForm.patchValue({
              title: loadedArticle.title,
              description: loadedArticle.description,
              body: loadedArticle.body,
              tagList: loadedArticle.tagList,
            });
            this.selectedTags = [...loadedArticle.tagList];
          });
      }
    });
  }

  onTagInputChange() {
    const inputValue = this.tagInput.value?.toLowerCase() || '';
    const availableTags = this.availableTags();

    if (inputValue.trim()) {
      this.filteredTags = availableTags.filter(
        (tag) =>
          tag.toLowerCase().includes(inputValue) &&
          !this.selectedTags.includes(tag)
      );
      this.showSuggestions = this.filteredTags.length > 0;
    } else {
      this.showSuggestions = false;
    }
  }

  addTagFromInput() {
    const tag = this.tagInput.value?.trim();
    if (tag && !this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      this.updateTagList();
    }
    this.resetTagInput();
  }

  addExistingTag(tag: string) {
    if (tag && !this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      this.updateTagList();
    }
    this.resetTagInput();
  }

  removeTag(tag: string) {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    this.updateTagList();
  }

  private updateTagList() {
    this.articleForm.get('tagList')?.setValue(this.selectedTags);
  }

  private resetTagInput() {
    this.tagInput.reset();
    this.showSuggestions = false;
  }

  getUnselectedTags(): string[] {
    const availableTags = this.availableTags();
    return availableTags.filter((tag) => !this.selectedTags.includes(tag));
  }
  errors: string[] = [];
  onSubmit() {
    this._articleSrv
      .submitArticleForm(
        this.articleForm,
        this.editMode,
        this.editedArticleSlug
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorsList = [];
          Object.keys(error.error.errors).map((key) => {
            errorsList.push(`${key}: ${error.error.errors[key].join(', ')}`);
            this.errors = [...errorsList];
          });
          return throwError(() => error);
        })
      )
      .subscribe((newArticle) => {
        this._router.navigate(['/article', newArticle.slug]);
      });
  }
}
