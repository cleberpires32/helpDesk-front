import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItensEstoqueService } from 'src/app/services/itens-estoque.service';
import { ItensEstoque } from '../ItensEstoque';

@Component({
  selector: 'app-itens-estoque-create',
  templateUrl: './itens-estoque-create.component.html',
  styleUrls: ['./itens-estoque-create.component.css']
})
export class ItensEstoqueCreateComponent implements OnInit {

  codigo: FormControl = new FormControl(null, Validators.minLength(3));
  descricao: FormControl = new FormControl(null, Validators.required);
  quantidade: FormControl = new FormControl(null, Validators.required);
  valor: FormControl = new FormControl(null, Validators.required);
  valor2: number = 12345.85;
  constructor(
    private itesnService: ItensEstoqueService,
    private toast: ToastrService,
    private router: Router) { }

  itens: ItensEstoque = {

    id:         '',
    descricao:  '',
    codigo:     '',
    quantidade: '',
    valor:      '',
    vinculoComChamado: false
  }

  ngOnInit(): void {
  }

  create(): void {
    this.itesnService.create(this.itens).subscribe(response =>{
      this.toast.success('Itens de estoque salvo com sucesso','Novo')
      this.router.navigate(['itensEstoques'])
    },ex =>{
      this.toast.error(ex.error().error());
    })
  }

  validaCampos(): boolean {
    return this.codigo.valid && this.descricao.valid && this.quantidade.valid && this.valor.valid;
  }

}
