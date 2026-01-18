import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlShortenRequestDTO } from '../../../shared/dtos/request/url-shorten-request.dto';
import { PaginatedResponseDTO } from '../../../shared/dtos/response/paginated-response.dto';
import { UrlResponseDTO } from '../../../shared/dtos/response/url-response.dto';
import { GenericResponseDTO } from '../../../shared/dtos/response/generic-response.dto';

@Injectable({
  providedIn: 'root',
})
export class UrlApi {
  constructor(private httpClient: HttpClient) {}

  private PRE_FIX = '/urls';

  fetchUrls(query: any) {
    return this.httpClient.get<PaginatedResponseDTO<UrlResponseDTO>>(`${this.PRE_FIX}`, {
      params: query,
    });
  }

  fetchUrlById(id: string) {
    return this.httpClient.get<GenericResponseDTO<UrlResponseDTO>>(`${this.PRE_FIX}/${id}`);
  }

  deleteUrlById(id: string) {
    return this.httpClient.delete<GenericResponseDTO<UrlResponseDTO>>(`${this.PRE_FIX}/${id}`);
  }

  updateUrlById(id: string, data: UrlShortenRequestDTO) {
    return this.httpClient.put<GenericResponseDTO<UrlResponseDTO>>(`${this.PRE_FIX}/${id}`, data);
  }

  shortenUrl(data: UrlShortenRequestDTO) {
    return this.httpClient.post<GenericResponseDTO<UrlResponseDTO>>(`${this.PRE_FIX}`, data);
  }
}
