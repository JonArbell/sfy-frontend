import { Component, computed, ElementRef, HostListener, OnInit, signal, ViewChild } from '@angular/core';
import { navs } from '../../shared/utils/sidebar-nav.util';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../core/stores/auth.store';
import { ConfirmDialogStore } from '../../core/stores/confirm-dialog.store';
import { NgIcon } from '@ng-icons/core';

@Component({
  standalone : true,
  selector: 'app-authenticated',
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIcon
  ],
  templateUrl: './authenticated.layout.html'
})
export class Authenticated implements OnInit{

  constructor(
    private authStore : AuthStore,
    private confirmDialogStore : ConfirmDialogStore
  ){}

  ngOnInit(): void {
    if(!this.authStore.getMyAccount().id){
      this.authStore.loadMyAccount();
    }
  }

  profileMenuOpen = signal(false);

  @ViewChild('profileMenu') profileMenu!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.profileMenu?.nativeElement.contains(event.target)) {
      this.profileMenuOpen.set(false);
    }
  }

  toggleProfileMenu(){
    this.profileMenuOpen.update(open => !open);
  }

  async confirmLogout() {
    const confirmed = await this.confirmDialogStore.ask({
      title: 'Logout',
      message: 'Are you sure you want to log out?',
      confirmText: 'Logout',
      cancelText: 'Cancel'
    });

    if(!confirmed) return;

    this.handleLogout();

  }

  myAccount = computed(() => this.authStore.getMyAccount());

  sidebarOpen = signal(false);

  navigations = navs;

  toggleSidebar() {
    this.sidebarOpen.update(open => !open);
  }

   handleLogout() {
    this.authStore.removeTokens();
    this.authStore.removeMyAccount();
    this.authStore.navigateToLogin();

  }

}
