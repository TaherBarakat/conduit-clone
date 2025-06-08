import { Component, inject } from '@angular/core';
import { ErrorService } from './shared/services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-food-app';

  private _errorSrv = inject(ErrorService);
  error = this._errorSrv.error;
  conformMessage = this._errorSrv.error;
}
