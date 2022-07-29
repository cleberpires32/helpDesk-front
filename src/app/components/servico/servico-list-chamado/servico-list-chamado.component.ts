import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ServicoService } from 'src/app/services/servico.service';
import { Chamado } from '../../chamado/Chamado';
import { Servico } from '../Servico';

@Component({
  selector: 'app-servico-list-chamado',
  templateUrl: './servico-list-chamado.component.html',
  styleUrls: ['./servico-list-chamado.component.css']
})
export class ServicoListChamadoComponent implements OnInit {

  ELEMENT_DATA: Servico[] = [];
  dataSource = new MatTableDataSource<Servico>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['select', 'id', 'descricao', 'valor'];
  selection = new SelectionModel<Servico>(true, []);
  chamadoId: any;
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
    itensEstoque: [],
    servicos: []
  };


  constructor(
    private service: ServicoService,
    private http: HttpClient,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private chamadoService: ChamadoService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.chamadoId = this.activeRoute.snapshot.paramMap.get('id')
    this.findAll();
    this.findByIdChamado();
  }

  findAll() {
    return this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Servico>(this.ELEMENT_DATA);
    })
  }

  createServicoChamado() {

    if (this.selection.selected.length > 0) {
        this.selection.selected.forEach(f => {
          this.chamado.servicos.push(f);
      });
      this.chamadoService.update(this.chamado).subscribe(response =>{
        this.toast.success('Servicos inclusos com sucesso','Cadastro')
      }, ex =>{
        this.toast.error(ex.error.error);
      });
      this.chamado.servicos = [];
    }

  }

  findByIdChamado() {
    this.chamadoService.findById(this.chamadoId).subscribe(response => {
      this.chamado = response
      console.log('chamado/serviços ',this.chamado);

    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Servico): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
