import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environments';
import { article } from '../../models/article.model';

@Component({
  selector: 'app-editor-page',
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
})
export class ArticleFormComponent implements OnInit {
  editMode: boolean = false;
  articleForm: FormGroup;

  constructor(private route: ActivatedRoute, private httpSrv: HttpClient) {}

  ngOnInit(): void {
    this.intForm();
  }

  intForm() {
    this.route.params.subscribe((params) => {
      if (params['article-slug']) this.editMode = false;
    });

    let title = new FormControl('', [Validators.required]);
    let description = new FormControl('', [Validators.required]);
    let body = new FormControl('', [Validators.required]);

    this.articleForm = new FormGroup({ title, description, body });
  }

  onSubmit() {
    this.httpSrv
      .post<article>(`${environment.apiUrl}/articles`, {
        article: { ...this.articleForm.value },
      })
      .subscribe((s) => {
        console.log(s);
      });
  }
}
