import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type articleForm = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
  body: FormControl<string>;
  tagList: FormControl<string[]>;
}>;
