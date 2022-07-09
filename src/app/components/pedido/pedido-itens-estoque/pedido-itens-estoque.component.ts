import { Chamado } from './../../chamado/Chamado';
import { ItensEstoqueService } from 'src/app/services/itens-estoque.service';
import { ItensEstoque } from './../../itens/ItensEstoque';
import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from 'src/app/services/chamado.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-pedido-itens-estoque',
  templateUrl: './pedido-itens-estoque.component.html',
  styleUrls: ['./pedido-itens-estoque.component.css']
})
export class PedidoItensEstoqueComponent implements OnInit {

  constructor(
    fb: FormBuilder,
    private chamadoService: ChamadoService,
    private toastrService: ToastrService,
    private actvRouter: ActivatedRoute,
    private itensEstoqueService: ItensEstoqueService) {
    this.toppings = fb.group({
      idItens: false
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  toppings: FormGroup;
  ELEMENT_DATA: ItensEstoque[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'codigo', 'quantidade', 'acoes'];
  dataSource = new MatTableDataSource<ItensEstoque>(this.ELEMENT_DATA);

  check: string[] = [];
  itensPedidoEstoque: ItensEstoque[] = []

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
    itensEstoque: []
  };

  ngOnInit(): void {
    this.chamado.id = this.actvRouter.snapshot.paramMap.get('id');
    this.findByIdChamado();
    this.findAllItensEstoque();
  }

  findAllItensEstoque() {
    this.itensEstoqueService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<ItensEstoque>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator
    });
  }

  findByIdChamado(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(response => {
      this.chamado = response;
    }, ex => { this.toastrService.warning('Chamado não encontrado') })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectCheckbox(event: any) {
    if (!this.chamado.itensEstoque.includes(event)) {
      this.chamado.itensEstoque.push(event);
    } else {
      this.chamado.itensEstoque.splice(this.chamado.itensEstoque.indexOf(event), 1)
    }
  }
}
