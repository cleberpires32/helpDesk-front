import { ChamadoService } from './../../../services/chamado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chamado } from '../Chamado';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'nomeCliente', 'dataAbertura', 'status', 'prioridade', 'nomeTecnico']
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private chamadoService: ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    return this.chamadoService.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
