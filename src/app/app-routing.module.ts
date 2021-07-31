import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PontosComponent } from './componente/ponto/pontos/pontos.component';
import { RegistrarPontoComponent } from './componente/ponto/registrar-ponto/registrar-ponto.component';
import { CadastrarUsuarioComponent } from './componente/usuario/cadastrar-usuario/cadastrar-usuario.component';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GuardiaoRotasGuard } from './service/guardiao-rotas.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [GuardiaoRotasGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardiaoRotasGuard] },
  { path: 'usuarios', component: UsuarioComponent, canActivate: [GuardiaoRotasGuard] },
  { path: 'usuario_cadastro', component: CadastrarUsuarioComponent, canActivate: [GuardiaoRotasGuard] },
  { path: 'pontos', component: PontosComponent, canActivate: [GuardiaoRotasGuard] },
  { path: 'ponto_registrar', component: RegistrarPontoComponent, canActivate: [GuardiaoRotasGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
