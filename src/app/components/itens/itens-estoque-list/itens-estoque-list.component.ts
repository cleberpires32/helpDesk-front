import { ItensEstoqueService } from './../../../services/itens-estoque.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItensEstoque } from '../ItensEstoque';

@Component({
  selector: 'app-itens-estoque-list',
  templateUrl: './itens-estoque-list.component.html',
  styleUrls: ['./itens-estoque-list.component.css']
})
export class ItensEstoqueListComponent implements OnInit {


  constructor(private itensEstoqueService: ItensEstoqueService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ELEMENT_DATA: ItensEstoque[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'codigo', 'quantidade','valor','acoes'];
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
