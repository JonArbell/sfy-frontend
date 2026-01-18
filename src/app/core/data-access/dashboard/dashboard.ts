import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponseDTO } from '../../../shared/dtos/response/generic-response.dto';
import {
  UrlSummaryResponseDTO,
  UrlChartsResponseDTO,
} from '../../../shared/dtos/response/dashboard.dto';
import { UrlResponseDTO } from '../../../shared/dtos/response/url-response.dto';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  constructor(private httpClient: HttpClient) {}

  private PRE_FIX = '/dashboard';

  fetchDashboardSummary() {
    return this.httpClient.get<GenericResponseDTO<UrlSummaryResponseDTO>>(
      `${this.PRE_FIX}/summary`,
    );
  }

  fetchDashboardChart() {
    return this.httpClient.get<GenericResponseDTO<UrlChartsResponseDTO>>(`${this.PRE_FIX}/charts`);
  }

  fetchDashboardRecentUrls() {
    return this.httpClient.get<GenericResponseDTO<UrlResponseDTO[]>>(`${this.PRE_FIX}/recent-urls`);
  }
}
