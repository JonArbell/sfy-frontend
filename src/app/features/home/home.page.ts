import { Component, signal } from '@angular/core';
import { form, FormField, minLength, pattern, required, validate } from '@angular/forms/signals';
import { Head } from '../../shared/components/head/head';
import { Authenticated } from '../../layout/authenticated/authenticated.layout';
import { toast } from 'ngx-sonner';
import { UrlApi } from '../../core/data-access/url/url-api';
import { UrlShortenRequestDTO } from '../../shared/dtos/request/url-shorten-request.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from '../../../environments/environment.development';

interface UrlFormErrors {
  url : string[];
  expirationDate: string[];
  password: string[];
}

@Component({
  selector: 'app-home',
  imports: [FormField,Head, Authenticated],
  templateUrl: './home.page.html'
})
export class Home {

  constructor(
    private urlApi : UrlApi,
    private clipboard: Clipboard
  ){}

  formModel = signal({
    url: '',
    expirationDate: '',
    password: ''
  });

  shortUrl = signal('');

  form = form(this.formModel, (schema) => {

    required(schema.url,
      {message : 'URL is required.'}
    );

    validate(schema.url, ({ value }) => {
      if (!value().startsWith('https://') && !value().startsWith('http://')) {
        return {
          kind: 'urlProtocol',
          message: 'URL must start with http:// or https://'
        }
      }
      return null;
    });

    minLength(schema.password,
      5,
      {message : 'Password must at least 5 characters.'}
    );

    pattern(
      schema.password,
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
      { message: 'Password must include letters and numbers.' }
    );

  });

  formErrors = signal<UrlFormErrors>({
    expirationDate : [],
    password : [],
    url : []
  });

  showAdvanced = signal(false);

  resetForm(){
    this.formModel.set({
      url: '',
      expirationDate: '',
      password: ''
    });
  }

  shortenUrl(){

    const validatedForm : UrlShortenRequestDTO = {
      url : this.formModel().url
    }

    this.shortUrl.set('');

    if(this.formModel().expirationDate !== '')
      validatedForm.expirationDate = this.formModel().expirationDate;

    if(this.formModel().password !== '')
      validatedForm.password = this.formModel().password;

    this.urlApi.shortenUrl(validatedForm)
    .subscribe({
      next : val => {
        this.shortUrl.set(val.data.short);

        this.resetForm();
      },
      error : (err : HttpErrorResponse) => {
        this.formErrors.set(err.error?.errors)
      }
    });

  }

  copyShortUrl() {
    if (this.shortUrl()) {
      this.clipboard.copy(`${environment.backendBaseUrlAPI}/urls/short/${this.shortUrl()}`);
      toast.success('Short URL copied to clipboard!');
    }
  }

}
