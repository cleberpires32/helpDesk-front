import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItensEstoqueService } from 'src/app/services/itens-estoque.service';
import { ItensEstoque } from '../ItensEstoque';

@Component({
  selector: 'app-itens-estoque-update',
  templateUrl: './itens-estoque-update.component.html',
  styleUrls: ['./itens-estoque-update.component.css']
})
export class ItensEstoqueUpdateComponent implements OnInit {

  constructor(
    private itensEstoqueService: ItensEstoqueService,
    private routerActive: ActivatedRoute,
    private toast: ToastrService,
    private route: Router) { }

  itensEstoque: ItensEstoque = {

    id: '',
    codigo: '',
    descricao: '',
    quantidade: '',
    valor: '',
    vinculoComChamado: false,
    quantidadeSolicitada: ''
  }


  ngOnInit(): void {
    this.itensEstoque.id = this.routerActive.snapshot.paramMap.get('id');
    this.findById();
  }

  findById() {
    this.itensEstoqueService.findById(this.itensEstoque.id).subscribe(resposta => {
      this.itensEstoque = resposta;
    })
  }

  update() {
    this.itensEstoqueService.update(this.itensEstoque).subscribe(response =>{
      this.itensEstoque = response;
      this.toast.success('Itens de Estoque atuzalizado com sucesso')
      this.route.navigate(['itensEstoques'])
    }, ex =>{
      this.toast.error('Não foi possível atualizar');
    });
  }

}
