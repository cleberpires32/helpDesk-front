import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Chamado } from '../Chamado';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'nomeCliente', 'dataAbertura', 'status', 'prioridade', 'nomeTecnico']

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
