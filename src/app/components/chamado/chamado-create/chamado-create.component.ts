import { Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  titulo: FormControl = new FormControl(null, Validators.required);
  prioridade: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);
  descricao: FormControl = new FormControl(null, Validators.required);

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    if (this.titulo.valid && this.prioridade.valid && this.status.valid && this.tecnico.valid && this.cliente.valid && this.descricao.valid) {
      return true
    } else { return false }
  }
}
