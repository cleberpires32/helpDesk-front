import { Chamado } from './../Chamado';
import { retry } from 'rxjs';
import { ChamadoService } from './../../../services/chamado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DialogContentComponent } from 'src/app/dialog/dialog-content/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  ELEMENT_DATASTATUS: Chamado[] = [];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'titulo','modelo', 'nomeCliente', 'dataAbertura', 'status', 'prioridade', 'nomeTecnico', 'acoes']
  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  constructor(private chamadoService: ChamadoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
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

  filterStatus(status: any): string {
    if (status == '0') { return 'ABERTO' }
    else if (status == '1') { return 'ANDAMENTO' }
    else if (status == '2') { return 'CANCELADO' }
    else { return 'ENCERRADO' }
  }

  filterStatusAndamento(status: any): boolean {
      if (status == '1') { return true }
      else return false
    }

  filterPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else { return 'ALTA' }
  }

  orderByStatus(selec: any): void{

    let filterRaio: Chamado[] = [];

    this.ELEMENT_DATA.forEach(element => {
      if(element.status == selec){
        filterRaio.push(element);
      }
    })
    this.ELEMENT_DATASTATUS = filterRaio;
    this.dataSource = new MatTableDataSource<Chamado>(filterRaio);
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const openDialogRef = this.dialog.open(DialogContentComponent);
    openDialogRef.afterClosed().subscribe(response =>{
      console.log(`Dialog Result: ${response}`);
    })
  }

}
