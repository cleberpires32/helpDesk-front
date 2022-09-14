import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Chamado } from './../../chamado/Chamado';
import { PendenciaStatusService } from './../../../services/pendencia-status.service';
import { PendenciaStatus } from './../PendenciaStatus';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';

import { ChamadoService } from 'src/app/services/chamado.service'

@Component({
  selector: 'app-andamento',
  templateUrl: './andamento.component.html',
  styleUrls: ['./andamento.component.css']
})
export class AndamentoComponent implements OnInit {

  constructor(private chamadoService: ChamadoService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private service: PendenciaStatusService,
              private toast: ToastrService,
              private route: Router) { }

  ngOnInit(): void {
    this.chamado.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findAll();
  }

  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamento: '',
    status: '',
    prioridade: '',
    titulo: '',
    modelo: '',
    recibo: '',
    observacoes: '',
    telefoneCliente: '',
    cliente: '',
    nomeCliente: '',
    tecnico: '',
    nomeTecnico: '',
    itensEstoque: [],
    servicos: [],
    adicionarIten: false
  };

  dataNow = new Date();
  txtpendencia = '';
  listDescricaoPendencia: string[] = [];
  listaPendenciaDB : PendenciaStatus[] = [];
  selected = this.dataNow;
  pendencia: PendenciaStatus = {id: '',descricao : '',chamadoId: this.chamado}

  salvar(){
    this.service.create(this.pendencia).subscribe((response) =>{
      this.reloadCurrentRoute();
    });
  }

  remover(idPendencia: any ){
    this.service.delete(idPendencia.id).subscribe(response =>{
      this.toast.success('Pendencia removida com sucesso', 'Delete')
      this.reloadCurrentRoute();
    }, ex => {
      if (ex.error.error) {
        this.toast.error(ex.error.message);
      }
    });
  }

  findAll(){
    this.service.findByAll(this.chamado.id).subscribe(response => {
      this.listaPendenciaDB = response;
    })
  }

  criaPendencia(texto: string){
    this.pendencia.descricao = texto,
    this.pendencia.chamadoId = this.chamado
  }

  addPendencia(){
  if( this.notNull() ){
    this.listDescricaoPendencia.push(this.txtpendencia);
    this.criaPendencia(this.txtpendencia);
    this.txtpendencia = '';
    this.salvar();
    }
  }

  removePendencia(event: Event, pen: string) {
    if(event){
        this.listDescricaoPendencia.forEach((p, index)=>{
          if(pen == p){
            this.listDescricaoPendencia.splice(index,1)
          }
        })
     }
  }

  finalizarOsm(){
console.log('data: ',this.selected)
  }

  notNull(){
    if(this.txtpendencia!="" && !(this.txtpendencia.match(/^\s+$/))){
        return true;
    }else{
        return false;
        }
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
}
