import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicoService } from './../../../services/servico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Servico } from '../Servico';

@Component({
  selector: 'app-servico-create',
  templateUrl: './servico-create.component.html',
  styleUrls: ['./servico-create.component.css']
})
export class ServicoCreateComponent implements OnInit {

  servico: Servico = {
    id: '',
    descricao: '',
    valor: '',
    isRegistration: false
  }

  desc: FormControl = new FormControl(null, Validators.required);
  vlr: FormControl = new FormControl(null, Validators.required);

  constructor(
    private servicoService: ServicoService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {

  }

  create(): void {

    if(!this.validaCampos()){
      return;
    }

    this.servicoService.create(this.servico).subscribe(response => {
      this.toast.success('Serviços cadastrado com sucesso', 'Cadastro')
      //this.router.navigate(['servicos'])
      this.reloadCurrentRoute();
    }, ex => {
      if (ex.error.error) {
        this.toast.error(ex.error.message);
      }
    })

  }

  validaCampos(): boolean {
    return this.desc.valid && this.vlr.valid;
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
