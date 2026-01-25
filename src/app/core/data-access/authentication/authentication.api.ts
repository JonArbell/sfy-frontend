import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { GenericResponseDTO } from '../../../shared/dtos/response/generic-response.dto';
import type { LoginResponseDTO } from '../../../shared/dtos/response/login-response.dto';
import { environment } from '../../../../environments/environment.development';
import { RegisterRequestDTO } from '../../../shared/dtos/request/register-request.dto';

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

  register(registerData: RegisterRequestDTO) {
    return this.client.post<GenericResponseDTO<LoginResponseDTO>>('/register', registerData);
  }

  googleAuth() {
    return `${environment.backendBaseUrlAPI}/google/auth`;
  }
}
