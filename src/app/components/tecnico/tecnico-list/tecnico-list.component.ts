import { Tecnico } from './../tecnico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {


ELEMENT_DATA: Tecnico[]=[
  { id: 1, nome: 'Cluindo Alves',cpf: '645-859-558-22',email: 'Alves@gmail.com', perfis:   ['0'], dataCriacao: '15/02/2022' },
  { id: 2, nome: 'Joao Peregrino',cpf: '645-859-558-22',email: 'joao@gmail.com', perfis:   ['0'], dataCriacao: '15/02/2022' },
  { id: 3, nome: 'Antonio Pedro',cpf: '645-859-558-22',email: 'antonio@gmail.com', perfis:   ['0'], dataCriacao: '15/02/2022' }

]

  constructor() { }

    displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
    dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}



