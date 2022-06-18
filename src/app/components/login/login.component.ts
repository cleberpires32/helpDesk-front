import { Crendenciais } from './../models/crendenciais';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  creds: Crendenciais = { email: '', senha: '' }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(5))

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  validaEmailSenha(): boolean{
    console.log("senha esta valida: "+ this.senha.valid)
    if(this.email.valid && this.senha.valid){
      return true
    }else
    return false
  }

  logar(){
    this.toast.error('Senha ou Email inválidos', 'Erro de Login')
  }
}
