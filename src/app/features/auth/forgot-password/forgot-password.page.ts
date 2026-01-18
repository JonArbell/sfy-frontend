import { Component } from '@angular/core';
import { Authentication } from '../../../layout/authentication/authentication.layout';
import { Head } from '../../../shared/components/head/head';

@Component({
  selector: 'app-forgot-password',
  imports: [Authentication, Head],
  templateUrl: './forgot-password.page.html'
})
export class ForgotPassword {

}
