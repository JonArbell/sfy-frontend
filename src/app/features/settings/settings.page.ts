import { Component } from '@angular/core';
import { Head } from '../../shared/components/head/head';
import { Authenticated } from '../../layout/authenticated/authenticated.layout';

@Component({
  selector: 'app-settings',
  imports: [Authenticated, Head],
  templateUrl: './settings.page.html'
})
export class Settings {

}
