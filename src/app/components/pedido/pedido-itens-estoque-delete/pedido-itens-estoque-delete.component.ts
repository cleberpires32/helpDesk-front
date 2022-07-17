import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ItensEstoqueService } from 'src/app/services/itens-estoque.service';
import { Chamado } from '../../chamado/Chamado';
import { ItensEstoque } from '../../itens/ItensEstoque';

@Component({
  selector: 'app-pedido-itens-estoque-delete',
  templateUrl: './pedido-itens-estoque-delete.component.html',
  styleUrls: ['./pedido-itens-estoque-delete.component.css']
})
export class PedidoItensEstoqueDeleteComponent implements OnInit {

  intensestouqe: ItensEstoque[] = []

  ELEMENT_DATA: ItensEstoque[] = [];
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
    nomeTecnico: '',
    itensEstoque: []
  };

  constructor(fb: FormBuilder,
    private chamadoService: ChamadoService,
    private toastrService: ToastrService,
    private actvRouter: ActivatedRoute,
    private itensEstoqueService: ItensEstoqueService,
    private route: Router) { }

  ngOnInit(): void {
    this.chamado.id = this.actvRouter.snapshot.paramMap.get('id');
    this.findByIdChamado();
    this.findAllItensEstoque();
  }

  delete(){console.log('implementar delete items do chamado');
  }

  findAllItensEstoque() {
    this.itensEstoqueService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<ItensEstoque>(this.ELEMENT_DATA);
    });
  }

  findByIdChamado(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(response => {
      this.chamado = response;
    }, ex => { this.toastrService.warning('Chamado não encontrado') })
  }

  onSelection(event: boolean, i: ItensEstoque) {
    if (event) {
      this.intensestouqe.push(i)
    } else {
      this.intensestouqe.splice(this.intensestouqe.indexOf(i, 1))
    }
    console.log(this.intensestouqe);
  }
}
