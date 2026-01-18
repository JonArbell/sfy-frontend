import { Component, computed } from '@angular/core';
import { AuthStore } from '../../core/stores/auth.store';
import { Home } from '../home/home.page';
import { Login } from '../auth/login/login.page';

@Component({
  selector: 'app-index',
  imports: [Home, Login],
  templateUrl: './index.page.html'
})
export class Index {
  constructor(
    private authStore : AuthStore
  ){}

  authenticated = computed(() => this.authStore.authenticated());

}
