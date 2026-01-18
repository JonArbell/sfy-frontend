import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyAccount as MyAccountType } from '../../../shared/types/my-account.type';
import { GenericResponseDTO } from '../../../shared/dtos/response/generic-response.dto';

@Injectable({
  providedIn: 'root',
})
export class MyAccount {

  constructor(
    private httpClient : HttpClient
  ) {}

  fetchMyAccount(){
    return this.httpClient.get<GenericResponseDTO<MyAccountType>>('/me');
  }

}
