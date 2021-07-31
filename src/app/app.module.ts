import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { CustomProgressBarComponent } from './componente/progress/custom-progress-bar/custom-progress-bar.component';
import { CadastrarUsuarioComponent } from './componente/usuario/cadastrar-usuario/cadastrar-usuario.component';
import { DialogCadastroUsuarioComponent } from './componente/dialog/dialog-cadastro-usuario/dialog-cadastro-usuario.component';
import { DialogLogoutComponent } from './componente/dialog/dialog-logout/dialog-logout.component';
import { DialogRemoverComponent } from './componente/dialog/dialog-remover/dialog-remover.component';
import { PontosComponent } from './componente/ponto/pontos/pontos.component';
import { RegistrarPontoComponent } from './componente/ponto/registrar-ponto/registrar-ponto.component';


export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    UsuarioComponent,
    CustomProgressBarComponent,
    CadastrarUsuarioComponent,
    DialogCadastroUsuarioComponent,
    DialogLogoutComponent,
    DialogRemoverComponent,
    PontosComponent,
    RegistrarPontoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule,
    MatExpansionModule,
    NgxMaskModule.forRoot(optionsMask),
    WebcamModule,
    HttpClientModule,
    HttpInterceptorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomProgressBarComponent,
    DialogCadastroUsuarioComponent,
    DialogLogoutComponent,
    DialogRemoverComponent,
  ]
})
export class AppModule {

}
