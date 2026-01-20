import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyAccountResponseDTO } from '../../../shared/types/my-account.type';
import { GenericResponseDTO } from '../../../shared/dtos/response/generic-response.dto';
import { UpdateUserCredentialsRequestDTO } from '../../../shared/dtos/request/user-credential-request.dto';
import { UserProfileRequestDTO } from '../../../shared/dtos/request/user-profile-request.dto';

@Injectable({
  providedIn: 'root',
})
export class MyAccount {
  constructor(private httpClient: HttpClient) {}

  fetchMyAccount() {
    return this.httpClient.get<GenericResponseDTO<MyAccountResponseDTO>>('/me');
  }

  updateCredentials(credentials: UpdateUserCredentialsRequestDTO) {
    return this.httpClient.put<GenericResponseDTO<MyAccountResponseDTO>>(
      '/me/credentials',
      credentials,
    );
  }

  updateProfile(profile: UserProfileRequestDTO) {
    return this.httpClient.put<GenericResponseDTO<MyAccountResponseDTO>>('/me/profile', profile);
  }
}
