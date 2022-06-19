import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Crendenciais } from '../components/models/crendenciais';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService()

  constructor(private httpClient: HttpClient) { }

  authentication(creds: Crendenciais) {

    return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  sucessFullLogin(authToken: string){
    //Salvando o token no localStorage em memoria.
    localStorage.setItem('token', authToken)
  }

  isAuthenticate(){
    let token = localStorage.getItem('token')
    if(token != null){
      return !this.jwtService.isTokenExpired(token) //retorna verdadeiro sempre se não estiver expirado.
    }
    return false
  }
}
