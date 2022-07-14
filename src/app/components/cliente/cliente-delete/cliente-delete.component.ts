import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  constructor(
    private clienteService: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private routerActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.routerActive.snapshot.paramMap.get('id');
    this.findById(this.cliente.id);
  }

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  admin: boolean = false;
  clie: boolean = false;
  tecni: boolean = false;

  findById(id: any): void {
    this.clienteService.findById(id).subscribe(response => {
      this.cliente = response;
      this.cleckedPerfis(this.cliente.perfis);
    })
  }

  deleta(): void {
    this.clienteService.delete(this.cliente).subscribe((respos) => {
      console.log(respos);

      this.toast.success('Cliente removido com sucesso', 'Delete')
      this.router.navigate(['clientes'])
    }, ex => {
      if (ex.error.error) {
        this.toast.error(ex.error.message);
      }
    })
  }

  cleckedPerfis(perfis: String[]): void {
    this.cliente.perfis.forEach(perf => {

      if (perf.match('ADMIN')) {
        this.admin = true;
      }
      if (perf.match('CLIENTE')) {
        this.clie = true;
      }
      if (perf.match('TECNICO')) {
        this.tecni = true;
      }
    })

  }


}
