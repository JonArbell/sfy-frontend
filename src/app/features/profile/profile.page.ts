import { Component } from '@angular/core';
import { Head } from '../../shared/components/head/head';
import { Authenticated } from '../../layout/authenticated/authenticated.layout';

@Component({
  selector: 'app-profile',
  imports: [Authenticated, Head],
  templateUrl: './profile.page.html'
})
export class Profile {

}
