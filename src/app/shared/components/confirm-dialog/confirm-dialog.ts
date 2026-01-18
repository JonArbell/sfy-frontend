import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { ConfirmDialogStore } from '../../../core/stores/confirm-dialog.store';
import { Modal } from '../modal/modal';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  imports: [Modal],
  templateUrl: './confirm-dialog.html'
})
export class ConfirmDialog {

  confirmDialogStore = inject(ConfirmDialogStore);

}
