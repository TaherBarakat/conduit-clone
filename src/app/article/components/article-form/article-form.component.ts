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
  tagInput = new FormControl('');
  filteredTags: string[] = [];
  showSuggestions: boolean = false;

  ngOnInit() {
    this._tagSrv.loadTags();
    this.initForm();
  }

  initForm() {
    this._route.params.subscribe((params) => {
      if (params['article-slug']) this.editMode = true;
    });

    let title = new FormControl('', [Validators.required]);
    let description = new FormControl('', [Validators.required]);
    let body = new FormControl('', [Validators.required]);
    let tagList = new FormControl(this.selectedTags);
    this.articleForm = new FormGroup({ title, description, body, tagList });
  }

  onSubmit() {
    console.log(this.articleForm.value);
    this._articleSrv.submitArticleForm(this.articleForm, this.editMode);
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
}
