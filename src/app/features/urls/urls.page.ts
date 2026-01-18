import { Component, signal, effect } from '@angular/core';
import { Authenticated } from '../../layout/authenticated/authenticated.layout';
import { Head } from '../../shared/components/head/head';
import { ActionButton, List } from '../../shared/components/list/list';
import { UrlApi } from '../../core/data-access/url/url-api';
import { UrlResponseDTO } from '../../shared/dtos/response/url-response.dto';
import { ActivatedRoute } from '@angular/router';
import { PaginationMeta } from '../../shared/types/meta-pagination.type';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfirmDialogStore } from '../../core/stores/confirm-dialog.store';
import { toast } from 'ngx-sonner';
import { HttpErrorResponse } from '@angular/common/http';
import { Modal } from '../../shared/components/modal/modal';
import { form, FormField, minLength, pattern, required, validate } from '@angular/forms/signals';
import { UrlShortenRequestDTO } from '../../shared/dtos/request/url-shorten-request.dto';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from '../../../environments/environment.development';
import { QrGenerator } from '../../shared/components/qr-generator/qr-generator';

interface UpdateFormModel extends Omit<UrlResponseDTO, 'expirationDate'> {
  expirationDate: string;
  password: string;
}

@Component({
  selector: 'app-urls',
  imports: [Authenticated, Head, List, Modal, FormField, QrGenerator],
  templateUrl: './urls.page.html',
})
export class Urls {
  urls = signal<UrlResponseDTO[]>([]);

  formModel = signal<UpdateFormModel>({
    id: '',
    original: '',
    short: '',
    active: false,
    expirationDate: '',
    password: '',
  });

  form = form(this.formModel, (schema) => {
    required(schema.original, { message: 'URL is required.' });

    validate(schema.original, ({ value }) => {
      if (!value().startsWith('https://') && !value().startsWith('http://')) {
        return {
          kind: 'urlProtocol',
          message: 'URL must start with http:// or https://',
        };
      }
      return null;
    });

    minLength(schema.password, 5, { message: 'Password must at least 5 characters.' });

    pattern(schema.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
      message: 'Password must include letters and numbers.',
    });
  });

  optional = signal(false);

  pagination = signal<PaginationMeta>({
    currentPage: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1,
  });

  updating = signal(false);

  shortUrl = signal('');

  qrCode = signal('');

  isFetchingUrls = signal(false);

  query!: ReturnType<typeof toSignal>;

  constructor(
    private urlApi: UrlApi,
    private route: ActivatedRoute,
    private confirmDialogStore: ConfirmDialogStore,
    private clipBoard: Clipboard,
  ) {
    this.query = toSignal(this.route.queryParams, { initialValue: {} });

    effect(() => {
      this.fetchUrls();
    });
  }

  fetchUrls() {
    this.isFetchingUrls.set(true);

    const query = this.query();
    this.urlApi.fetchUrls(query).subscribe({
      next: (val) => {
        this.urls.set(val.data);
        this.pagination.set(val.meta);
      },
      complete: () => this.isFetchingUrls.set(false),
    });
  }

  actionButtons: ActionButton[] = [
    { label: 'Generate QR', color: 'green', action: (item) => this.generateQR(item) },
    { label: 'Update', color: 'blue', action: (item) => this.prepareUpdate(item) },
    { label: 'Delete', color: 'red', action: (item) => this.confirmDelete(item) },
  ];

  generateQR(url: UrlResponseDTO) {
    this.urlApi.fetchUrlById(url.id).subscribe({
      next: (val) =>
        this.qrCode.set(`${environment.backendBaseUrlAPI}/urls/short/${val.data.short}`),
    });
  }

  updateUrl() {
    const { id, ...form } = this.formModel();

    const requestForm: UrlShortenRequestDTO = {
      url: form.original,
      active: form.active,
      expirationDate: form.expirationDate,
      password: form.password,
    };

    this.urlApi.updateUrlById(id, requestForm);
  }

  showAdvanced = signal(false);

  copyShortUrl() {
    if (this.shortUrl()) {
      this.clipBoard.copy(`${environment.backendBaseUrlAPI}/urls/short/${this.shortUrl()}`);
      toast.success('Short URL copied to clipboard!');
    }
  }

  deleteUrl(id: string) {
    this.urlApi.deleteUrlById(id).subscribe({
      next: (val) => {
        toast.success(`Successfully deleted url ${val.data.original}`);
        this.fetchUrls();
      },
      error: (err: HttpErrorResponse) => toast.error(err?.message),
    });
  }

  async prepareUpdate(url: UrlResponseDTO) {
    this.updating.set(true);
  }

  async confirmDelete(url: UrlResponseDTO) {
    const confirmed = await this.confirmDialogStore.ask({
      title: 'Delete Url',
      message: 'Are you sure you want to delete this url?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    this.deleteUrl(url.id);
  }
}
