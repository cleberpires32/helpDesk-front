import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private toast: ToastrService,
    private router: Router) { }

  itens: ItensEstoque = {

    id:         '',
    codigo:     '',
    descricao:  '',
    quantidade: '',
    valor:      ''
  }

  ngOnInit(): void {
  }


  create(): void {
    console.log(this.itens);
  }

  validaCampos(): boolean {
    return this.codigo.valid && this.descricao.valid && this.quantidade.valid && this.valor.valid;
  }

}
