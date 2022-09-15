import { HttpClient } from '@angular/common/http';
import { Chamado } from './../../chamado/Chamado';
import { ItensEstoqueService } from 'src/app/services/itens-estoque.service';
import { ItensEstoque } from './../../itens/ItensEstoque';
import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from 'src/app/services/chamado.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { isEmpty, min } from 'rxjs';

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
    private itensEstoqueService: ItensEstoqueService,
    private route: Router) {
    this.toppings = fb.group({
      idItens: false
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  toppings: FormGroup;
  ELEMENT_DATA: ItensEstoque[] = [];
  itens_selecionados: ItensEstoque[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'codigo', 'quantidade', 'quantidade_solicitada', 'vinculo'];
  dataSource = new MatTableDataSource<ItensEstoque>(this.ELEMENT_DATA);

  qt_solicitada: FormControl = new FormControl(null, Validators.required);
  quantidade: FormControl = new FormControl(null, Validators.required);
  vinculoChamado: FormControl = new FormControl(null, Validators.required);

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

  itens: ItensEstoque = {
    id: '',
    codigo: '',
    descricao: '',
    quantidade: '',
    valor: '',
    vinculoComChamado: false,
    quantidadeSolicitada: ''
  }

  ngOnInit(): void {
    this.chamado.id = this.actvRouter.snapshot.paramMap.get('id');
    this.findByIdChamado();
    this.findAllItensEstoque();

  }

  update(): void {
    this.regraDcampo();
    if (this.chamado.itensEstoque.length === 0) {
      this.toastrService.warning("Valores obrigatórios como checkBox ou quantidade solicitada")
      return
    }
    else {

      this.chamado.servicos = [];
      this.chamadoService.update(this.chamado).subscribe((response) => {
        this.toastrService.success('Pedidos de Estoque vinculado com sucesso', 'Adiciona Itens')
        this.reloadCurrentRoute();
      }, ex => {
        this.toastrService.error("Duplicação de dados.");
      })
    }

  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
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

  vincularItensChamado(itensPagina: ItensEstoque) {
    this.itens = itensPagina;
    this.chamado.itensEstoque = []

    this.dataSource.data.map(i => {
      if (!this.itens.vinculoComChamado && i === this.itens) {
        this.chamado.adicionarIten = true;
        this.itens_selecionados.push(this.itens)
      }
      else
        if (this.itens.vinculoComChamado && i === this.itens) {
          this.chamado.adicionarIten = false;
          this.itens_selecionados.splice(this.itens_selecionados.indexOf(itensPagina), 1)
          this.chamado.itensEstoque = []
        }
    })
    this.chamado.itensEstoque = this.itens_selecionados;
    this.dataSource = this.dataSource;
  }

  validaFormGroup(): boolean {
    return this.vinculoChamado.valid || this.qt_solicitada.valid
  }

  regraDcampo(){
    this.chamado.itensEstoque.forEach(f =>{
      if(f.quantidadeSolicitada == null){
        f.quantidadeSolicitada = '1';
      }
    })
  }
}
