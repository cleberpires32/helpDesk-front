import { MatRadioModule } from '@angular/material/radio';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMaskModule } from 'ngx-mask';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { ItensEstoqueCreateComponent } from './components/itens/itens-estoque-create/itens-estoque-create.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ItensEstoqueListComponent } from './components/itens/itens-estoque-list/itens-estoque-list.component';
import { PedidoItensEstoqueComponent } from './components/pedido/pedido-itens-estoque/pedido-itens-estoque.component';
import { ItensEstoqueUpdateComponent } from './components/itens/itens-estoque-update/itens-estoque-update.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import { PedidoItensEstoqueUpdateComponent } from './components/pedido/pedido-itens-estoque-update/pedido-itens-estoque-update.component';
import { PedidoItensEstoqueDeleteComponent } from './components/pedido/pedido-itens-estoque-delete/pedido-itens-estoque-delete.component';
import { NotaFiscalComponent } from './components/pdfs/relatorio/nota-fiscal/nota-fiscal.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TecnicoListComponent,
    LoginComponent,
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    TecnicoDeleteComponent,
    ClienteListComponent,
    ClienteCreateComponent,
    ClienteUpdateComponent,
    ClienteDeleteComponent,
    ChamadoListComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChamadoReadComponent,
    ItensEstoqueCreateComponent,
    ItensEstoqueListComponent,
    PedidoItensEstoqueComponent,
    ItensEstoqueUpdateComponent,
    PedidoItensEstoqueUpdateComponent,
    PedidoItensEstoqueDeleteComponent,
    NotaFiscalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({timeOut:4000,closeButton:true,progressBar:true}),
    HttpClientModule,
    MatPaginatorModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot(),
    MatRadioModule,
    MatBadgeModule,
    MatExpansionModule

  ],
  providers: [AuthInterceptorProvider, { provide: LOCALE_ID, useValue: 'pt' },
  { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
