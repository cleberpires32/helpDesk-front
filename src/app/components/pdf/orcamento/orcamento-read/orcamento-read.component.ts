import { Router } from '@angular/router';
import { ItensEstoqueService } from 'src/app/services/itens-estoque.service';
import { ItensEstoque } from './../../../itens/ItensEstoque';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { __values } from 'tslib';

@Component({
  selector: 'app-orcamento-read',
  templateUrl: './orcamento-read.component.html',
  styleUrls: ['./orcamento-read.component.css']
})
export class OrcamentoReadComponent implements OnInit {

  constructor(private itensEstoqueService: ItensEstoqueService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ELEMENT_DATA: ItensEstoque[] = [];
  displayedColumns: string[] = ['codigo', 'descricao', 'quantidade', 'valor', 'valor_total'];
  dataSource = new MatTableDataSource<ItensEstoque>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.findAll();
  }


  findAll() {
    this.itensEstoqueService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<ItensEstoque>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator
    });
  }

  getTotal() {
    return this.ELEMENT_DATA.map(t =>
       Number(t.valor) * Number(t.quantidade)).reduce((t, valor) => t + valor)
  }

}
