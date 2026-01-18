import { Injectable, signal } from '@angular/core';

type TypeOptions = 'info' | 'success' | 'warning' | 'danger';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogStore {

  title = signal('Confirm');
  message = signal('');
  isOpen = signal(false);

  type = signal<TypeOptions>('info');

  confirmButtonText = signal('Yes');
  cancelButtonText = signal('No');

  private resolver?: (value: boolean) => void;

  ask(config: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  }): Promise<boolean> {

    this.title.set(config.title ?? 'Confirm');
    this.message.set(config.message);
    this.confirmButtonText.set(config.confirmText ?? 'Yes');
    this.cancelButtonText.set(config.cancelText ?? 'No');

    this.isOpen.set(true);

    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  confirm() {
    this.resolver?.(true);
    this.close();
  }

  cancel() {
    this.resolver?.(false);
    this.close();
  }

  close() {
    this.isOpen.set(false);
    this.resolver = undefined;
  }
}
