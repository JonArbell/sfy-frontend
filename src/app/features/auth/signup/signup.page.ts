import { Component } from '@angular/core';
import { Authentication } from '../../../layout/authentication/authentication.layout';
import { RouterLink } from '@angular/router';

import { provideIcons } from '@ng-icons/core';

import { lucideMail, lucideLock, lucideUser } from '@ng-icons/lucide';
import { Title } from '@angular/platform-browser';
import { Head } from '../../../shared/components/head/head';

@Component({
  selector: 'app-signup',
  imports: [Authentication, RouterLink, Head],
  templateUrl: './signup.page.html',
  providers : [
    provideIcons({ lucideMail, lucideLock, lucideUser })
  ]
})

export class Signup {

}
