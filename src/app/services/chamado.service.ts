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
}
