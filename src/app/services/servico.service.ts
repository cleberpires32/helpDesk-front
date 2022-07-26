import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Servico } from '../components/servico/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  create(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(`${API_CONFIG.baseUrl}/servicos`, servico)
  }
}
