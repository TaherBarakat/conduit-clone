import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _error = signal('');
  private _conformMessage = signal('');

  error = this._error.asReadonly();
  conformMessage = this._conformMessage.asReadonly();

  showError(message: string) {
    // console.log(message, 'mesage');
    this._error.set(message);
  }

  clearError() {
    this._error.set('');
  }

  showConformMessage(message: string) {
    this._conformMessage.set(message);
  }
  clearConformMessage() {
    this._conformMessage.set('');
  }

  func;

  setFunctionality(passedFunc) {
    this.func = passedFunc;
  }
}
