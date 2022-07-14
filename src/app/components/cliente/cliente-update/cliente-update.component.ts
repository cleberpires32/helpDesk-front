import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl = new FormControl(null, Validators.required);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private clienteService: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private routerActive: ActivatedRoute) { }

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  admin: boolean = false;
  clie: boolean = false;
  tecni: boolean = false;
  perf: string[] = [];

  ngOnInit(): void {
    this.cliente.id = this.routerActive.snapshot.paramMap.get('id');
    this.findById(this.cliente.id);
  }

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  findById(id: any): void {


    this.clienteService.findById(id).subscribe(response => {

      this.cliente = response;
      this.cleckedPerfis(this.cliente.perfis);
      this.substituiPerfil(this.cliente.perfis)
      console.log(this.cliente);
    })
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso', 'update')
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

  cleckedPerfis(perfis: String[]): void {
    this.cliente.perfis.forEach(perf => {

      if (perf.match('ADMIN')) {
        this.admin = true;
      }
      if (perf.match('CLIENTE')) {
        this.clie = true;
      }
      if (perf.match('TECNICO')) {
        this.tecni = true;
      }
    })

  }

  substituiPerfil(perfis: String[]) {

    this.cliente.perfis.forEach(perf => {

      if (perf.match('ADMIN')) {
        this.perf.push('0');
      }
      if (perf.match('TECNICO')) {
        this.perf.push('1');
      }
      if (perf.match('CLIENTE')) {
        this.perf.push('2');
      }
    })
    this.cliente.perfis.splice;
    this.cliente.perfis = this.perf;
  }
}

