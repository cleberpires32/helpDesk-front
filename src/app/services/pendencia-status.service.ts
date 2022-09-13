import { Observable } from 'rxjs';
import { PendenciaStatus } from './../components/status/PendenciaStatus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PendenciaStatusService {

  constructor(private http: HttpClient) { }

  create(pendencia: PendenciaStatus): Observable<PendenciaStatus>{
   return this.http.post<PendenciaStatus>(`${API_CONFIG.baseUrl}/pendencia`, pendencia)
  }

  delete(idPendencia: any): Observable<PendenciaStatus>{
    return this.http.delete<PendenciaStatus>(`${API_CONFIG.baseUrl}/pendencia/${idPendencia}`)
  }

  findByAll(idchamado: any): Observable<PendenciaStatus[]>{
    return this.http.get<PendenciaStatus[]>(`${API_CONFIG.baseUrl}/pendencia/chamado/${idchamado}`)
  }
}
