import { Observable } from 'rxjs';
import { PendenciaStatus } from './../components/status/PendenciaStatus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { EncerraChamado } from '../components/status/EncerraChamado';

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

  encerraChamado(encerChamado: EncerraChamado): Observable<EncerraChamado> {
    return this.http.post<EncerraChamado>(`${API_CONFIG.baseUrl}/pendencia/encerraChamado`, encerChamado)
  }

  findByAll(idchamado: any): Observable<PendenciaStatus[]>{
    return this.http.get<PendenciaStatus[]>(`${API_CONFIG.baseUrl}/pendencia/chamado/${idchamado}`)
  }

}
