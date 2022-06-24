import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from '../tecnico';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private routerActive: ActivatedRoute) { }

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
  perf: string[] = [];

  ngOnInit(): void {
    this.tecnico.id = this.routerActive.snapshot.paramMap.get('id');
    this.findById(this.tecnico.id);
  }

  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

  findById(id: any): void {


    this.tecnicoService.findById(id).subscribe(response => {

      this.tecnico = response;
      this.cleckedPerfis(this.tecnico.perfis);
      this.substituiPerfil(this.tecnico.perfis)
      console.log(this.tecnico);
    })
  }

  update(): void {
    this.tecnicoService.update(this.tecnico).subscribe(() => {
      this.toast.success('Técnico atualizado com sucesso', 'update')
      this.router.navigate(['tecnicos'])
    }, ex => {
      if (ex.error.error) {
        this.toast.error(ex.error.error);
      }
    })
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
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

  substituiPerfil(perfis: String[]) {

    this.tecnico.perfis.forEach(perf => {

      if (perf.match('ADMIN')) {
        this.perf.push('0');
      }
      if (perf.match('TECNICO')) {
        this.perf.push('1');
      }
      if (perf.match('CLIENTE')) {
        this.perf.push('2');
      }
    })
    this.tecnico.perfis.splice;
    this.tecnico.perfis = this.perf;
  }
}

