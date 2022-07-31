import { ChamadoService } from 'src/app/services/chamado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItensEstoqueService } from 'src/app/services/itens-estoque.service';
import { ItensEstoque } from './../../../itens/ItensEstoque';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { __values } from 'tslib';
import { Chamado } from 'src/app/components/chamado/Chamado';
import { Servico } from 'src/app/components/servico/Servico';

@Component({
  selector: 'app-orcamento-read',
  templateUrl: './orcamento-read.component.html',
  styleUrls: ['./orcamento-read.component.css']
})
export class OrcamentoReadComponent implements OnInit {

  constructor(
    private itensEstoqueService: ItensEstoqueService,
    private chamadoService: ChamadoService,
    private actiRouter: ActivatedRoute) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ELEMENT_DATA: ItensEstoque[] = [];

  ELEMENT_DATA_SERVICO: Servico[] = [];

  valor: any;
  valor_servico = 0;

  displayedColumns: string[] = ['descricao', 'quantidade', 'valor', 'valor_total'];
  displayedColumnsServico: string[] = ['descricao', 'valor'];
  dataSource = new MatTableDataSource<ItensEstoque>(this.ELEMENT_DATA);
  dataSourceServico = new MatTableDataSource<Servico>(this.ELEMENT_DATA_SERVICO);

  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamento: '',
    status: '',
    prioridade: '',
    titulo: '',
    modelo:'',
    recibo:'',
    observacoes: '',
    telefoneCliente: '',
    cliente: '',
    nomeCliente: '',
    tecnico: '',
    nomeTecnico: '',
    itensEstoque: [],
    servicos: []
  };

  ngOnInit(): void {
    this.chamado.id = this.actiRouter.snapshot.paramMap.get('id');
    this.findByIdChamado();
  }

  findByIdChamado() {
    this.chamadoService.findById(this.chamado.id).subscribe(response => {
      this.chamado = response;
      console.log('o que esta aparecendo no chamado', this.chamado);

      this.ELEMENT_DATA = this.chamado.itensEstoque;
      this.ELEMENT_DATA_SERVICO = this.chamado.servicos;
      this.dataSource = new MatTableDataSource<ItensEstoque>(this.ELEMENT_DATA);
      this.dataSourceServico = new MatTableDataSource<Servico>(this.ELEMENT_DATA_SERVICO);
      this.dataSource.paginator = this.paginator
    })

  }

  getValorTotalItens() {
    if (this.ELEMENT_DATA.length > 0) {
      return this.ELEMENT_DATA.map(t =>
        Number(t.valor) * Number(t.quantidadeSolicitada)).reduce((t, valor) => t + valor)
    }
    return 0;
  }

  getValorTotalServicos() {
    if (this.ELEMENT_DATA_SERVICO.length > 0) {
      return this.ELEMENT_DATA_SERVICO.map(t => Number(t.valor)).reduce((acc, value) => acc + value, 0);
    }
    return 0;
  }
}
