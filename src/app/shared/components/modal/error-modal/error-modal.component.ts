import { Component, inject, input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css',
})
export class ErrorModalComponent {
  title? = input<string>();
  message = input<string>();
  // isConfirmMessage? = input<boolean>(false);

  private errorService = inject(ModalService);
  private _modal = inject(ModalService);
  isConfMsg = this._modal.conformMessage;
  onCancel() {
    this.errorService.clearConformMessage();
  }

  onConfirm() {
    this.errorService.clearConformMessage();
    this.errorService.func();
  }
  onClearError() {
    this.errorService.clearError();
  }
}
