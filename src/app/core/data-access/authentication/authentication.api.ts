import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { GenericResponseDTO } from '../../../shared/dtos/response/generic-response.dto';
import type { LoginResponseDTO } from '../../../shared/dtos/response/login-response.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApi {
  constructor(private client: HttpClient) {}

  login(username: string, password: string) {
    return this.client.post<GenericResponseDTO<LoginResponseDTO>>('/login', {
      username: username,
      password: password,
    });
  }

  googleAuth() {
    return `${environment.backendBaseUrlAPI}/google/auth`;
  }
}
