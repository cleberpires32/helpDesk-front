import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs';
import { PedidoEstoque } from './../components/pedido/PedidoEstoque';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoEstoqueService {

  constructor(private http: HttpClient) { }

  delete(pedidoEstoque: PedidoEstoque): Observable<PedidoEstoque> {
    return this.http.delete<PedidoEstoque>(`${API_CONFIG.baseUrl}/pedidosEstoques`);
  }
}
