import { Component, inject } from '@angular/core';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-food-app';

  private _errorSrv = inject(ModalService);
  error = this._errorSrv.error;
  conformMessage = this._errorSrv.conformMessage;
}
