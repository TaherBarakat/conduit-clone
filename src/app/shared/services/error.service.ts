import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _error = signal('');
  private _conformMessage = signal('');

  error = this._error.asReadonly();
  conformMessage = this._conformMessage.asReadonly();

  showError(message: string) {
    console.log(message, 'mesage');
    this._error.set(message);
  }

  clearError() {
    this._error.set('');
  }
}
