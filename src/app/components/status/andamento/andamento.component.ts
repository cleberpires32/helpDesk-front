import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';

import { Chamado } from '../../chamado/Chamado'
import { ChamadoService } from 'src/app/services/chamado.service'

@Component({
  selector: 'app-andamento',
  templateUrl: './andamento.component.html',
  styleUrls: ['./andamento.component.css']
})
export class AndamentoComponent implements OnInit {

  constructor(private chamadoService: ChamadoService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.activeRoute.snapshot.paramMap.get('id');
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
  listPendencia: string[] = [];
  selected = this.dataNow;

  addPendencia(){
  if( this.notNull() ){
    this.listPendencia.push(this.txtpendencia);
    this.txtpendencia = '';
    }
  }


  removePendencia(event: Event, pen: string) {
    if(event){
        this.listPendencia.forEach((p, index)=>{
          if(pen == p){
            this.listPendencia.splice(index,1)
          }
        })
     }
  }

  finalizarOsm(){

  }

  notNull(){
    if(this.txtpendencia!="" && !(this.txtpendencia.match(/^\s+$/))){
        return true;
    }else{
        return false;
        }
  }

}
