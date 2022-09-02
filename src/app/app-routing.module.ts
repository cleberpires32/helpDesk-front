import { ServicoCreateComponent } from './components/servico/servico-create/servico-create.component';
import { OrcamentoReadComponent } from './components/pdf/orcamento/orcamento-read/orcamento-read.component';
import { ItensEstoqueUpdateComponent } from './components/itens/itens-estoque-update/itens-estoque-update.component';
import { PedidoItensEstoqueComponent } from './components/pedido/pedido-itens-estoque/pedido-itens-estoque.component';
import { ItensEstoqueListComponent } from './components/itens/itens-estoque-list/itens-estoque-list.component';
import { ItensEstoqueCreateComponent } from './components/itens/itens-estoque-create/itens-estoque-create.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { AndamentoComponent } from './components/status/andamento/andamento.component';

const routes: Routes = [
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children:
      [
        { path: 'home', component: HomeComponent },
        { path: 'tecnicos', component: TecnicoListComponent },
        { path: 'tecnicos/create', component: TecnicoCreateComponent},
        { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent},
        { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },
        { path: 'clientes', component: ClienteListComponent},
        { path: 'clientes/create', component: ClienteCreateComponent},
        { path: 'clientes/update/:id', component: ClienteUpdateComponent},
        { path: 'clientes/delete/:id', component: ClienteDeleteComponent},
        { path: 'chamados', component: ChamadoListComponent},
        { path: 'chamados/create', component: ChamadoCreateComponent},
        { path: 'chamados/update/:id', component: ChamadoUpdateComponent},
        { path: 'chamados/read/:id', component: ChamadoReadComponent},
        { path: 'chamados/pedidosChamado/:id', component: PedidoItensEstoqueComponent},
        { path: 'itensEstoques', component: ItensEstoqueListComponent},
        { path: 'itensEstoques/create', component: ItensEstoqueCreateComponent},
        { path: 'itensEstoques/update/:id', component: ItensEstoqueUpdateComponent},
        { path: 'chamados/:id/orcamento', component: OrcamentoReadComponent},
        { path: 'servicos/create', component: ServicoCreateComponent},
        { path: 'chamados/:id/status/andamento', component: AndamentoComponent}
      ]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
