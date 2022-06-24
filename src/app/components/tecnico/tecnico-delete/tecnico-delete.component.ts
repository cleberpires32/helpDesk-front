import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from '../tecnico';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  constructor(
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private routerActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.tecnico.id = this.routerActive.snapshot.paramMap.get('id');
    this.findById(this.tecnico.id);
  }

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  admin: boolean = false;
  cliente: boolean = false;
  tecni: boolean = false;

  findById(id: any): void {
    this.tecnicoService.findById(id).subscribe(response => {
      this.tecnico = response;
      this.cleckedPerfis(this.tecnico.perfis);
    })
  }

  deleta(): void {
    this.tecnicoService.delete(this.tecnico.id).subscribe(() => {
      this.toast.success('Técnico removido com sucesso', 'Delete')
      this.router.navigate(['tecnicos'])
    }, ex => {
      if (ex.error.error) {
        this.toast.error(ex.error.error);
      }
    })
  }

  cleckedPerfis(perfis: String[]): void {
    this.tecnico.perfis.forEach(perf => {

      if (perf.match('ADMIN')) {
        this.admin = true;
      }
      if (perf.match('CLIENTE')) {
        this.cliente = true;
      }
      if (perf.match('TECNICO')) {
        this.tecni = true;
      }
    })

  }

}
