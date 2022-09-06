import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-andamento',
  templateUrl: './andamento.component.html',
  styleUrls: ['./andamento.component.css']
})
export class AndamentoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dataNow = new Date('2021-04-23T10:00:00.000');
  txtpendencia = '';
  listPendencia: string[] = [];

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

  notNull(){
    if(this.txtpendencia!="" && !(this.txtpendencia.match(/^\s+$/))){
        return true;
    }else{
        return false;
        }
  }

}
