import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs';
import { ItensEstoque } from './../components/itens/ItensEstoque';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItensEstoqueService {

  constructor(private http: HttpClient) { }

  create(itensEstoque: ItensEstoque): Observable<ItensEstoque>{
    return this.http.post<ItensEstoque>(`${API_CONFIG.baseUrl}/itensEstoques`, itensEstoque);
  }

}
