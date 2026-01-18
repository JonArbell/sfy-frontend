import { computed, Injectable,signal } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { MyAccount } from "../../shared/types/my-account.type";
import { Router } from "@angular/router";
import { MyAccount as MyAccountDataAccess } from "../data-access/my-account/my-account.api";
import { toast } from "ngx-sonner";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthStore {

  private token = signal<string | null>(null);

  private refreshToken = signal<string | null>(null);

  private myAccount = signal<MyAccount>({
    id : '',
    username : '',
    fullName : '',
    email : null,
    icon : null,
    updatedAt : null
  });

  constructor(
    private cookieService: CookieService,
    private router : Router,
    private myAccountDataAccess : MyAccountDataAccess
  ) {
    this.token.set(cookieService.get('token'));
    this.refreshToken.set(cookieService.get('refreshToken'));
  }

  authenticated = computed(() => !!this.token() || !!this.refreshToken());

  setToken(token: string, tokenType: 'token' | 'refreshToken') {
    this.cookieService.set(tokenType, token);

    if (tokenType === 'token') {
      this.token.set(token);
    } else {
      this.refreshToken.set(token);
    }

  }

  setMyAccount(myAccount : any){
    this.myAccount.set(myAccount);
  }

  getToken(tokenType : 'token' | 'refreshToken') : string | null {

    if(tokenType === 'token')
      return this.token();

    return this.refreshToken();
  }

  getMyAccount() : MyAccount {
    return this.myAccount();
  }

  removeTokens() {
    this.cookieService.delete('token');
    this.cookieService.delete('refreshToken');
    this.token.set(null);
    this.refreshToken.set(null);
  }

  removeMyAccount(){
    this.myAccount.set({
      id : '',
      username : '',
      fullName : '',
      email : null,
      icon : null,
      updatedAt : null
    });
  }

  navigateToLogin(){
    this.router.navigate(['/']);
  }

  loadMyAccount(){
    this.myAccountDataAccess.fetchMyAccount()
    .subscribe({
      next : val => this.setMyAccount(val.data),
      error : (err : HttpErrorResponse) => toast.error(err.message)
    });
  }

}
