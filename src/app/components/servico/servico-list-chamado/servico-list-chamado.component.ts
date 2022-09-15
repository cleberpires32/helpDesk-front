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
  servicosChecked: Servico[] = [];
  countServicoAdicionado = 0;

  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamento: '',
    dataEntrega: '',
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


  constructor(
    private service: ServicoService,
    private http: HttpClient,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private chamadoService: ChamadoService,
    private toast: ToastrService,
    private router: Router
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
      this.isRegistration();
      this.countServicoAdicionado = this.ELEMENT_DATA.length;
    })
  }

  createServicoChamado() {

    this.getServicos();

    this.chamadoService.update(this.chamado).subscribe(response => {
      this.toast.success('Servicos inclusos com sucesso', 'Cadastro')
      this.reloadCurrentRoute();
    }, ex => {
      this.toast.error("Duplicação de dados");
    });
  }

  deleteServicoChamado() {
    this.chamado.servicos = [];
    this.chamado.servicos = this.servicosChecked;
    this.chamadoService.updateServicosChamado(this.chamado).subscribe(response => {
      this.toast.success('Serviços alterados com sucesso', 'Remover')
      this.reloadCurrentRoute();
    })
  }

  getServicos() {
    if (this.selection.selected.length > 0) {
      this.chamado.servicos = []
      this.chamado.itensEstoque = [];
      this.selection.selected.forEach(f => {
        this.chamado.servicos.push(f);
      });
    }
  }

  findByIdChamado() {
    this.chamadoService.findById(this.chamadoId).subscribe(response => {
      this.chamado = response
      this.isRegistration();
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

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  onSelection(event: boolean, i: Servico) {
    if (event) {
      this.servicosChecked.push(i)
    } else {
      this.servicosChecked.splice(this.servicosChecked.indexOf(i, 1))
    }
  }

  isRegistration() {
    this.ELEMENT_DATA.forEach(y => {
      this.chamado.servicos.find(e => {
        if (e.id == y.id) {
          y.isRegistration = true;
          this.countServicoAdicionado = this.countServicoAdicionado - 1;
        }
      })
    })
  }

}
