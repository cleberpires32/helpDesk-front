import { ItensEstoqueService } from 'src/app/services/itens-estoque.service';
import { ItensEstoque } from './../../itens/ItensEstoque';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from 'src/app/services/chamado.service';
import { Chamado } from '../../chamado/Chamado';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pedido-itens-estoque',
  templateUrl: './pedido-itens-estoque.component.html',
  styleUrls: ['./pedido-itens-estoque.component.css']
})
export class PedidoItensEstoqueComponent implements OnInit {

  constructor(
    private chamadoService: ChamadoService,
    private toastrService: ToastrService,
    private actvRouter: ActivatedRoute,
    private itensEstoqueService: ItensEstoqueService) { }

    @ViewChild(MatPaginator) paginator: MatPaginator | any;


    ELEMENT_DATA: ItensEstoque[] = [];
    displayedColumns: string[] = ['id', 'descricao', 'codigo', 'quantidade','acoes'];
    dataSource = new MatTableDataSource<ItensEstoque>(this.ELEMENT_DATA);

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
      nomeTecnico: ''
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
/*
  addPerfil(check: any): void {
    if (this.ELEMENT_DATA.includes(check)) {
      this.ELEMENT_DATA.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
    console.log("perfis: ",this.cliente.perfis);

  }
  */
}
