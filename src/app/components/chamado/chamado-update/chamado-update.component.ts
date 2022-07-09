import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from './../../../services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from './../../tecnico/tecnico';
import { Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../cliente/cliente';
import { Chamado } from '../Chamado';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  tit: FormControl = new FormControl(null, Validators.required);
  pri: FormControl = new FormControl(null, Validators.required);
  sta: FormControl = new FormControl(null, Validators.required);
  tec: FormControl = new FormControl(null, Validators.required);
  cli: FormControl = new FormControl(null, Validators.required);
  obs: FormControl = new FormControl(null, Validators.required);

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private chamadoService: ChamadoService,
    private toastrService: ToastrService,
    private router: Router,
    private actvRouter: ActivatedRoute) { }

  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamento: '',
    status: '',
    prioridade: '',
    titulo: '',
    observacoes: '',
    cliente: '',
    nomeCliente: '',
    tecnico: '',
    nomeTecnico: '',
    itensEstoque: []
  };

  listaTecnicos: Tecnico[] = [];
  listaClientes: Cliente[] = [];

  ngOnInit(): void {
    this.chamado.id = this.actvRouter.snapshot.paramMap.get('id');
    this.findTecnicos()
    this.findClientes()
    this.findById();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(response => {
      console.log(response);
      this.toastrService.success('Chamado salvo com sucesso', 'Novo Chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastrService.error(ex.error.error);
    })
  }

  validaCampos(): boolean {
    if (this.tit.valid && this.pri.valid && this.sta.valid && this.tec.valid && this.cli.valid && this.obs.valid) {
      return true
    } else { return false }
  }

  findTecnicos(): void {
    this.tecnicoService.findAll().subscribe(response => {
      this.listaTecnicos = response;
    })
  }

  findClientes(): void {
    this.clienteService.findAll().subscribe(response => {
      this.listaClientes = response;
    })
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(response => {
      this.chamado = response;
    }, ex => { this.toastrService.warning('Chamado não encontrado') })
  }

  update(): void {
    this.chamado.dataAbertura.slice
    this.chamadoService.update(this.chamado).subscribe(response =>{
      this.toastrService.success('Chamado atualizado com sucesso.');
      this.router.navigate(['chamados'])
    }, ex =>{
      this.toastrService.error(ex.error.error)
    })
  }
}
