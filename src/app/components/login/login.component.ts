import { Router } from '@angular/router';
import { getTestBed } from '@angular/core/testing';
import { Crendenciais } from './../models/crendenciais';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  creds: Crendenciais = { email: '', senha: '' }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3))

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router) { }

    isLoading = false;

  ngOnInit(): void {
  }

  validaEmailSenha(): boolean {
    return this.email.valid && this.senha.valid
  }

  tologgetLoading = () =>{
    this.isLoading = true;

    setTimeout(()=>{
      this.isLoading = false
    }, 300000)
  }

  logar() {
    this.tologgetLoading();
    this.authService.authentication(this.creds).subscribe(response => {
      this.authService.sucessFullLogin(response.headers.get('Authorization')!.substring(7))
      this.router.navigate([''])
      //this.toast.info(response.headers.get(`Authorization`)!)
    }, () => { this.toast.error('Senha ou Email inválidos', 'Erro de Login') })
  }
}
