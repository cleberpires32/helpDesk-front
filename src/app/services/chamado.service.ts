import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Chamado } from '../components/chamado/Chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {


  constructor(private http: HttpClient) { }

  findAll(): Observable<Chamado[]>{
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`)
  }

  create(chamado: Chamado): Observable<Chamado>{
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`,chamado)
  }

  findById(id: any): Observable<Chamado>{
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`)
  }

  update(chamado: Chamado): Observable<Chamado>{
    return this.http.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${chamado.id}`, chamado)
  }

  updateServicosChamado(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${chamado.id}/servicos`, chamado.servicos)
  }

}
