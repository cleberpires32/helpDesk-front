import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from './../../../services/cliente.service';
import { Form, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl = new FormControl(null, Validators.required);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private tecnicoService: ClienteService,
    private toast: ToastrService,
    private router: Router) { }

  cliente: Cliente = {

    id: '',
    nome: '',
    cpf: '',
    telefone: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  ngOnInit(): void {
  }

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
    console.log("perfis: ",this.cliente.perfis);

  }

  create(): void {
    console.log(this.cliente);

    this.tecnicoService.create(this.cliente).subscribe(response => {
      this.toast.success('Cliente cadastrado com sucesso', 'Cadastro')
      this.router.navigate(['clientes'])
    }, ex => {
      if (ex.error.error) {
        this.toast.error(ex.error.error);
      }
    })
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.telefone.valid && this.senha.valid;
  }
}
