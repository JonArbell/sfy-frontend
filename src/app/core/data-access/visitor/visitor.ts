import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResponseDTO } from '../../../shared/dtos/response/paginated-response.dto';
import { VisitorResponseDTO } from '../../../shared/dtos/response/visitor-response.dto';

@Injectable({
  providedIn: 'root',
})
export class Visitor {
  private PRE_FIX = '/visitors';

  constructor(
    private httpClient : HttpClient
  ){}

  fetchAllVisitors(query : any){
    return this.httpClient.get<PaginatedResponseDTO<VisitorResponseDTO>>(`${this.PRE_FIX}`);
  }

}
